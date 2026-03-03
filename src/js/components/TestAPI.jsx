import React from "react";

function TestAPI() {

    const baseUrl = 'https://playground.4geeks.com/todo/';
    const usersEndPoint = 'users/';
    const todosEndPoint = 'todos/';
    const userName = 'fatimaov';
    const seedData = [
        {
            label: 'Walk the dog',
        },
        {
            label: 'Make the bed',
        },
        {
            label: 'Eat',
        },
    ]

    // Initializer
    async function checkUser() {
        try {
            let response = await readUser();
            if (response.ok === false) {
                console.log('checkUser: user doesnt exist')
                console.log('checkUser: creating user...')
                await createUser();
                response = await readUser();
            }
            let jsonResponse = await response.json();
            if (jsonResponse.todos.length === 0) {
                console.log('checkUser: no tasks')
                await addSeedData();
                response = await readUser();
                jsonResponse = await response.json();
                console.log('checkUser: tasks added')
            }
            const todos = jsonResponse.todos;
            return todos;
        } catch (error) {
            console.log(error)
        }
    }

    // GET User
    async function readUser() {
        const urlToFetch = baseUrl + usersEndPoint + userName;
        try {
            const response = await fetch(urlToFetch)
            if (response.ok) {
                console.log(`readUser: ${response.ok}`)
                return response;
            } else {
                console.log(`readUser: ${response.ok}`)
                return response;
            }
        } catch (error) {
            console.log(error)
        }
    }

    // READ todos
    async function readTodos() {
        const response = await readUser();
        const jsonResponse = await response.json();
        const todos = jsonResponse.todos;
        todos.map((todo) => console.log(`label:${todo.label} id:${todo.id}`))
        return todos;
    }

    // POST todo
    async function addTodo(label) {
        const urlToFetch = baseUrl + todosEndPoint + userName;
        try {
            const response = await fetch(urlToFetch, {
                method: 'POST',
                body: JSON.stringify({ label: label }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                console.log(`task ${label} added`)
            }
        } catch (error) {
            console.log(error)
        }
    }


    // POST User
    async function createUser() {
        const urlToFetch = baseUrl + usersEndPoint + userName;
        try {
            const response = await fetch(urlToFetch, {
                method: 'POST',
                body: '',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log('createUser: user created')
        } catch (error) {
            console.log('Request failed', error.message)
        }
    }

    // POST Todos
    async function addSeedData() {
        const urlToFetch = baseUrl + todosEndPoint + userName;
        let taskResponse = '';
        try {
            for (let i = 0; i < seedData.length; i++) {
                taskResponse = await fetch(urlToFetch, {
                    method: 'POST',
                    body: JSON.stringify(seedData[i]),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (taskResponse.ok) {
                    console.log(`addSeedData: Task ${i + 1} added`)
                } else {
                    console.log(`addSeedData: Task ${i + 1} failed`)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    // DELETE User
    async function removeUser() {
        const urlToFetch = baseUrl + usersEndPoint + userName;
        try {
            const response = await fetch(urlToFetch, {
                method: 'DELETE',
                body: '',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (!response.ok) {
                const jsonResponse = await response.json()
                console.log(jsonResponse.detail)
            } else {
                console.log(`removeUser: user removed`)
            }

        } catch (error) {
            console.log(error)
        }
    }


    // DELETE todo
    async function deleteTask(id) {
        const urlToFetch = baseUrl + todosEndPoint + id;
        const userTodos = await readTodos();
        let check = undefined;
        for (const userTodosIndex in userTodos) {
            if (userTodos[userTodosIndex].id === id) {
                check = true;
            } else {
                continue;
            }
        }
        console.log(id)

        if (check) {
            console.log(`user has that todo with index ${id}`)
            try {
                const response = await fetch(urlToFetch, {
                    method: 'DELETE',
                    body: '',
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (response.ok) {
                    console.log('task deleted')
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log(`user doesn't have that todo with index ${id}`)
        }

    }

    return (
        <>
            <h1>Test API</h1>
            <button onClick={checkUser}>Check user</button>
            <button onClick={removeUser}>Delete user</button>
            <button onClick={readUser}>Read user</button>
            <button onClick={readTodos}>Read TODOS</button>
            <button onClick={() => addTodo('Have breakfast')}>Add new task</button>
            <button onClick={() => deleteTask(10)}>Delete task</button>
        </>
    )
}

export default TestAPI;


// check the user exists: true or false
// true. checks if seed data exists (true or false)
// true. sets the initial value of tasks todos/todo
// false. create seed data and sets the initial value of tasks
// false. creates user and seed data
