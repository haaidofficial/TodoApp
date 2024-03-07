import React from 'react';
import './index.css';


export function EditTodo({ currentTodo, setTodos, todoIndex }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [todo, setTodo] = React.useState({ taskName: '', desc: '', priority: '' });


    React.useEffect(() => {
        const { taskName, desc, priority } = currentTodo;
        setTodo({ taskName, desc, priority })
    }, [currentTodo])


    function addTaskHandler() {
        setTodos(prevState => {
            const temp = [...prevState];
            temp[todoIndex] = todo


            return temp
        })

        handleModal(false);


    }


    function handleChange(event, inputValType) {

        const value = event.target.value.trim();

        if (value) {
            setTodo(prevState => {
                return {
                    ...prevState,
                    [inputValType]: value
                }
            });
        }


    }


    function handleModal(type) {
        setOpenModal(type);
    }

    console.log(todo, 'edit');

    return (
        <>
            <button onClick={() => handleModal(true)}>Edit</button>


            {
                openModal && <div className="add-todo-modal-container">
                    <div className="add-todo-modal">
                        <h4>Edit</h4>
                        <div>
                            <input type="text" value={todo.taskName} placeholder="Enter task" onChange={(e) => handleChange(e, 'taskName')} />
                        </div>
                        <div>
                            <input type="text" value={todo.desc}  placeholder="Enter description" onChange={(e) => handleChange(e, 'desc')} />
                        </div>
                        <div>
                            <select onChange={(e) => handleChange(e, 'priority')}>
                                <option selected={todo.priority === 'low'} value={'low'}>Low</option>
                                <option selected={todo.priority === 'medium'} value={'medium'}>Medium</option>
                                <option selected={todo.priority === 'high'} value={'high'}>High</option>
                            </select>
                        </div>

                        <div>
                            <button onClick={addTaskHandler}>Update Task</button>
                            <button onClick={() => handleModal(false)}>Close</button>
                        </div>

                    </div>
                </div>
            }

        </>
    )
}