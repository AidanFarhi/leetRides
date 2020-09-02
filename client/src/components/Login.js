import React, {useState} from 'react'
import Register from './Register'
import '../cmp-styles/Login.css'

export default function Login(props) {
    const [username, setUsername] = useState({username: ''})
    const [password, setPassword] = useState({password: ''})
    const [registering, setRegister] = useState({registering: false})

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
                props.method(login.user)
            }
        } catch(er) {console.log(er)}
    }
    const handleRegister = () => {
        setRegister({
            registering: !registering.registering
        })
    }

    return (
        <div id='login-form-div'>
            <div id='login-form-items'>
                <h3 id='login-header'>Login/Register</h3>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='username' placeholder='Username' value={username.username} onChange={handleUsername} required/>
                    <br></br>
                    <input type='password' name='password' placeholder='Password' value={password.password} onChange={handlePassword} required/>
                    <br></br>
                    <button type='submit'>Login</button>   
                </form>
                <button onClick={handleRegister}>create an account</button>
                {registering.registering ? <Register method={props.method}/> : null}
            </div>
        </div>
    )
}
