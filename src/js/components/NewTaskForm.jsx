import React from "react";

function NewTaskForm({ addNewTask, newTask, setNewTask }) {
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className="input-group">
                <input
                    type="text"
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
                    placeholder="What needs to be done?"
                    className="form-control border-0"
                />
                <button onClick={addNewTask} className="btn btn-primary rounded">Add</button>
            </form>
        </>
    )
}

export default NewTaskForm;