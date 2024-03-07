import React from 'react';
import './index.css';


export function AddTodo({ setTodos }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [todo, setTodo] = React.useState({ taskName: '', desc: '', priority: 'low' });

    function addTaskHandler() {
        setTodos(prevState => {
            return [
                ...prevState,
                todo
            ]
        });


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

        if (!type) {
            setTodo({ taskName: '', desc: '', priority: '' })
        }
    }


    return (
        <>

            <div className='add-task-btn'>
                <button className='add-task-btn' onClick={() => handleModal(true)}>Add Task</button>
            </div>

            {
                openModal && <div className="add-todo-modal-container">
                    <div className="add-todo-modal">
                        <div>
                            <input type="text" placeholder="Enter task" onChange={(e) => handleChange(e, 'taskName')} />
                        </div>
                        <div>
                            <input type="text" placeholder="Enter description" onChange={(e) => handleChange(e, 'desc')} />
                        </div>
                        <div>
                            <select onChange={(e) => handleChange(e, 'priority')}>
                                <option value={'low'}>Low</option>
                                <option value={'medium'}>Medium</option>
                                <option value={'high'}>High</option>
                            </select>
                        </div>

                        <div>
                            <button onClick={addTaskHandler}>Save Task</button>
                            <button onClick={() => handleModal(false)}>Close</button>
                        </div>

                    </div>
                </div>
            }

        </>
    )
}