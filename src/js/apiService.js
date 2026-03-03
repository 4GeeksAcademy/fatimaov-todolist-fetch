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

// ------------- USER

// POST User
export async function createUser() {
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

// DELETE User
export async function removeUser() {
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

// GET User
export async function readUser() {
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

// ------------- TODOS

// POST seedData
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

// POST todo
export async function addTodo(label) {
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

// GET todos
export async function readTodos() {
    const response = await readUser();
    const jsonResponse = await response.json();
    const todos = jsonResponse.todos;
    todos.map((todo, id) => console.log(`label:${todo.label} id:${todo.id}`))
    return todos;
}

// DELETE todo
export async function deleteTask(id) {
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

// Initializer
async function todos() {
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

await removeUser();
export default await todos();
