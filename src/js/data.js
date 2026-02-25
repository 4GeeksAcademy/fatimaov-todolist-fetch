import generateId from "./generateId";

const todos = [
    {
        task: 'Walk the dog',
        id: generateId()
    },
    {
        task: 'Make the bed',
        id: generateId()
    },
    {
        task: 'Eat',
        id: generateId()
    },
]

export default todos;