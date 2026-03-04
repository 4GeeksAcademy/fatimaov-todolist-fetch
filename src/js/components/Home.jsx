import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import NewTaskForm from "./NewTaskForm";
import styles from "../../styles/Home.module.css"
import todos from "../apiService";
import { createUser, removeUser, addTodo, deleteTodo, readTodos } from "../apiService";

const Home = () => {
	const [tasks, setTasks] = useState(todos);
	const [newTask, setNewTask] = useState('');

	// Add new task
	async function handleClickAddNewTask() {
		if (newTask.length !== 0) {
			await addTodo(newTask)
			setTasks(await readTodos())
		}
		setNewTask('')
	}

	// Remove Task
	async function handleRemove(id) {
		await deleteTodo(id)
		return setTasks(await readTodos())
	}

	// Remove all tasks
	async function handleRemoveAll() {
		await removeUser()
		await createUser()
		setTasks(await readTodos())
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
				<div className="d-flex justify-content-between align-items-end">
				<p className="mt-5 mb-0 text-start fw-light">{tasks.length} items left</p>
				<button className="btn btn-danger btn-sm" onClick={handleRemoveAll}>Delete all</button>
				</div>
			</div>
			<div className={`border border-top-0 border-1 border-dark mx-auto ${styles.noteUnderOne}`}></div>
			<div className={`border border-top-0 border-1 border-dark mx-auto ${styles.noteUnderTwo}`}></div>
		</>
	);
};

export default Home;