import React from 'react';
import './index.css'
import { AddTodo } from './AddTodo';
import { EditTodo } from './EditTodo';

export function TodoList() {


    const [todos, setTodos] = React.useState([]);
    const [paginatedTodo, setPaginatedTodo] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [pageSet, setPageSet] = React.useState(0);



    React.useEffect(() => {
        const length = todos.length;
        const pageSet = length / 5;
        setPageSet(Math.floor(pageSet));

    }, [todos])

    React.useEffect(() => {

        // const temp = JSON.parse(JSON.stringify(todos));

        // if (temp.length > 5) {
        //     temp.splice(page, page + 5);
        //     console.log(temp);

        // }

        // setPaginatedTodo(temp);


    }, [page, todos])



    function deleteTask(taskIndex) {
        const temp = todos.filter((todo, index) => {
            return taskIndex !== index
        })


        setTodos(temp);
    }


    console.log(todos);


    function handlePagination(action) {
        let count = page;
        if (action === 'prev') {
            count--;
        }
        else {
            count++;
        }


        if (count < 1) {
            count = 1;
        }

        setPage(count);
    }
    console.log(pageSet, 'page set');



    return (

        <>


            <AddTodo setTodos={setTodos} />
            <div className='todo-table'>
                <table className='todolist'>
                    <tr>
                        <th>S.No.</th>
                        <th>Task Name</th>
                        <th>Priority</th>
                        <th colSpan={2}>Action</th>
                    </tr>

                    {
                        todos.map((todo, index) => {
                            let priorityColor = '';

                            if (todo.priority === 'low') {
                                priorityColor = 'blue'
                            }
                            else if (todo.priority === 'medium') {
                                priorityColor = 'green'
                            }
                            else if (todo.priority === 'high') {
                                priorityColor = 'red'
                            }
                            return (
                                <tr key={index} style={{ backgroundColor: priorityColor }}>

                                    <td>{index + 1}</td>
                                    <td>{todo.taskName}</td>
                                    <td>{todo.desc}</td>
                                    <td>{todo.priority}</td>
                                    <td colSpan={2}>
                                        <EditTodo currentTodo={todo} setTodos={setTodos} todoIndex={index} />

                                        <button onClick={() => deleteTask(index)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </table>


                {
                    todos.length > 0 && <div className='pagination'>
                        <div className='pagination-btn'>
                            <button onClick={() => handlePagination('prev')}>Prev</button>
                            <span>{page}</span>
                            <button onClick={() => handlePagination('next')}>Next</button>
                        </div>
                    </div>
                }

            </div>


        </>
    )
}