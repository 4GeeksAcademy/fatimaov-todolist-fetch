import React from "react";
import styles from '../../styles/Tasks.module.css'

function Tasks({ tasks, removeTask }) {

    return (
        <>
            {tasks.map((task) => {
                return <li className="list-group-item d-flex justify-content-between rounded-0 border-0 position-relative display-6" key={task.id}>
                    {task.task}
                    <div className={`position-absolute w-100 h-100 start-0 top-0 d-flex align-items-center justify-content-end ${styles.btnClose}`}>
                        <button
                            className={`btn btn-close me-2`}
                            onClick={() => removeTask(task.id)}
                        >
                        </button>
                    </div>
                </li>
            }
            )
                .reverse()
            }
        </>
    )
}

export default Tasks;