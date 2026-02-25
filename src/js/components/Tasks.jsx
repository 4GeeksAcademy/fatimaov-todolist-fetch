import React from "react";

function Tasks({ tasks, removeTask }) {



    return (
        <>
            <ul>
                {tasks
                    .map((task) => {
                        return <li key={task.id}>
                            {task.task}
                            <button
                                className="btn btn-close"
                                onClick={() => removeTask(task.id)}
                            >
                            </button>
                        </li>
                    }
                    )
                    .reverse()
                }
            </ul>
        </>
    )
}

export default Tasks;