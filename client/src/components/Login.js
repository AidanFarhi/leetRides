import React, {useState} from 'react'

export default function Login() {
    const [username, setUsername] = useState({username: ''})
    const [password, setPassword] = useState({password: ''})

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
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(username.username)
        console.log(password.password)
    }
    return (
        <div id='login-form-div'>
            <h1>Welcome</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='Username' value={username.username} onChange={handleUsername} required/>
                <input type='password' name='password' placeholder='Password' value={password.password} onChange={handlePassword} required/>
                <button type='submit'>Login</button>   
            </form>
            <h1>{username.username}</h1>
            <h2>{password.password}</h2>
            <hr></hr>
            <h2>Create an account</h2>
        </div>
    )
}
