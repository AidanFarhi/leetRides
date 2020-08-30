import React, {useState} from 'react'
import Register from './Register'

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
                body: JSON.stringify({name: username.username, password: password.password,})
            })
            const login = await response.json()
            if (login.result === 'login-succesful') {
                props.methods[0](login.user)
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
            <h1>Welcome</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='Username' value={username.username} onChange={handleUsername} required/>
                <input type='password' name='password' placeholder='Password' value={password.password} onChange={handlePassword} required/>
                <button type='submit'>Login</button>   
            </form>
            <hr></hr>
            <button onClick={handleRegister}>Register</button>
            {registering.registering ? <Register method={props.methods[0]}/> : null}
            <h2>-------- or -------</h2>
            <h2>Continue as guest</h2>
            <button onClick={props.methods[1]}>Guest Login</button>
            <hr></hr>
        </div>
    )
}
