import React from "react";

function TestAPI() {

    function checkUser() {
        fetch('https://playground.4geeks.com/todo/users/fatimaov')
            .then((response) => {
                console.log(response.status)
                if (response.ok) {
                    console.log('user exists')
                    return response.json();
                }
                else {
                    console.log("user doesn't exist");
                    fetch('https://playground.4geeks.com/todo/users/fatimaov', {
                        method: 'POST',
                        body: '',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then((response) => {
                        console.log(response.ok)
                    })
                }
                throw new Error('Request failed!');
            }, (networkError) => console.log(networkError))
    }

    async function checkUser2() {
        const checkUser = await fetch('https://playground.4geeks.com/todo/users/fatimaov')
        const responseJSON = await checkUser.json()
        console.log('async function', responseJSON.todos)
    }

    function deleteUser() {

    }

    return (
        <>
            <h1>Test API</h1>
            <button onClick={checkUser}>Check user</button>
            <button onClick={checkUser2}>Check user2</button>
            <button onClick={deleteUser}>Delete user</button>
        </>
    )
}

export default TestAPI;