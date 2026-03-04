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

// POST User
export async function createUser() {
    const urlToFetch = baseUrl + usersEndPoint + userName;
    try {
        await fetch(urlToFetch, {
            method: 'POST',
            body: '',
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// DELETE User
export async function removeUser() {
    const urlToFetch = baseUrl + usersEndPoint + userName;
    try {
        await fetch(urlToFetch, {
            method: 'DELETE',
            body: '',
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// GET User
async function readUser() {
    const urlToFetch = baseUrl + usersEndPoint + userName;
    try {
        const response = await fetch(urlToFetch)
        return response;
    } catch (error) {
        console.log(error)
    }
}


// POST seedData
async function addSeedData() {
    const urlToFetch = baseUrl + todosEndPoint + userName;
    for (let i = 0; i < seedData.length; i++) {
        try {
            await fetch(urlToFetch, {
                method: 'POST',
                body: JSON.stringify(seedData[i]),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// POST todo
export async function addTodo(label) {
    const urlToFetch = baseUrl + todosEndPoint + userName;
    try {
        await fetch(urlToFetch, {
            method: 'POST',
            body: JSON.stringify({ label: label }),
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// GET todos
export async function readTodos() {
    const response = await readUser();
    const jsonResponse = await response.json();
    const todos = jsonResponse.todos;
    return todos;
}

// DELETE todo
export async function deleteTodo(id) {
    const urlToFetch = baseUrl + todosEndPoint + id;
    try {
        await fetch(urlToFetch, {
            method: 'DELETE',
            body: '',
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

// Initializer
async function todos() {
    try {
        let response = await readUser();
        if (response.ok === false) {
            await createUser();
            response = await readUser();
        }
        let jsonResponse = await response.json();
        if (jsonResponse.todos.length === 0) {
            await addSeedData();
            response = await readUser();
            jsonResponse = await response.json();
        }
        const todos = jsonResponse.todos;
        return todos;
    } catch (error) {
        console.log(error)
    }
}

export default todos;
