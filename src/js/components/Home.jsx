import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import NewTaskForm from "./NewTaskForm";
import todos from "../data"
import generateId from "../generateId";
import styles from "../../styles/Home.module.css"

const Home = () => {
	const [tasks, setTasks] = useState(() => todos);
	const [newTask, setNewTask] = useState('');

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
		return setTasks(tasks.filter(task => task.id !== id));
	}

	const prueba = {
		label: "hola"
	}



	


	return (
		<>
			<h1 className="display-1 text-center mt-5 mb-3">todos</h1>
			<div className={`border border-top-0 border-1 border-dark p-3 mx-auto text-center ${styles.width}`} >
				<NewTaskForm
					addNewTask={handleClickAddNewTask}
					newTask={newTask}
					setNewTask={setNewTask}
				/>
				<ul className="list-group mt-4">
					<Tasks
						tasks={tasks}
						removeTask={handleRemove}
					/>
				</ul>
				<p className="mt-5 mb-0 text-start fw-light">{tasks.length} items left</p>
			</div>
			<div className={`border border-top-0 border-1 border-dark mx-auto ${styles.noteUnderOne}`}></div>
			<div className={`border border-top-0 border-1 border-dark mx-auto ${styles.noteUnderTwo}`}></div>
		</>
	);
};

export default Home;