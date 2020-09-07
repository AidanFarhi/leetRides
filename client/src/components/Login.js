import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import '../cmp-styles/Login.css'

export default function Login(props) {
    const [username, setUsername] = useState({username: ''})
    const [password, setPassword] = useState({password: ''})
    const [error, setError] = useState('')

    const handleUsername = (event) => {
        setUsername({
            username: event.target.value
        })
    }
    const handlePassword = (event) => {
        setPassword({
            password: event.target.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('users/login', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                body: JSON.stringify({username: username.username, password: password.password,})
            })
            const login = await response.json()
            if (login.result === 'login-succesful') {
                setError('Login Successful!')
                localStorage.setItem('loggedIn', 'true')
                localStorage.setItem('id', login.user.id.toString())
                localStorage.setItem('name', login.user.name)
                localStorage.removeItem('guestId')
                setTimeout(() => {
                    props.methods[0]()
                }, 700)
            } else {
                setError(login.result)
            }
        } catch(er) {setError(er)}
    }

    return (
        <div id='login-form-div'>
            <button id='close-login' onClick={props.methods[1]}>X</button> 
            <div id='login-form-items'>
                <h3 id='login-header'>Login/Register</h3>
                <p id='error-message-login'>{error}</p>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='username' placeholder='Username' value={username.username} onChange={handleUsername} required/>
                    <br></br>
                    <input type='password' name='password' placeholder='Password' value={password.password} onChange={handlePassword} required/>
                    <br></br>
                    <button id='submit-button' type='submit'>Login</button>   
                </form>
                <button onClick={props.methods[2]}>create an account</button>
            </div>
        </div>
    )
}
