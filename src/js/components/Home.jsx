import React, { useState } from "react";
import Tasks from "./Tasks";
import todos from "../data"
import generateId from "../generateId";



const Home = () => {
	const [tasks, setTasks] = useState(() => todos);
	console.log(tasks)
	const [newTask, setNewTask] = useState('');
	console.log(newTask)

	// Add new task
	function handleClickAddNewTask() {
		if (newTask.length !== 0) {
			setTasks(
				[
					...tasks,
					{
						task: newTask,
						id: generateId()
					}
				]
			)
		}
		setNewTask('')
	}

	// Remove Task
	function handleRemove(id) {
		return setTasks((prevTask) => prevTask.filter(x => x.id !== id));
	}


	return (
		<>
			<h1>TODOS</h1>
			<form>
				<input
					type="text" onChange={(e) => setNewTask(e.target.value)}
					onKeyDown={(e) => { if (e.key === 'Enter') handleClickAddNewTask() }}
					value={newTask}
					placeholder="new task"
				/>
				<button onClick={handleClickAddNewTask}>Add</button>
			</form>
			<Tasks tasks={tasks} removeTask={handleRemove} />
		</>

	);
};

export default Home;