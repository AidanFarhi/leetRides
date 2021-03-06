import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import '../cmp-styles/Register.css'

export default function Register(props) {
    const [name, setName] = useState({name: ''})
    const [username, setUsername] = useState({username: ''})
    const [password, setPassword] = useState({password: ''})
    const [imageUrl, setImageUrl] = useState({imageUrl: ''})
    const [address, setAddress] = useState({address: ''})
    const [email, setEmail] = useState({email: ''})
    const [renderCars, setRenderCars] = useState(false)
    const [error, setError] = useState('')

    const handleName = (event) => setName({name: event.target.value})
    const handleUsername = (event) => setUsername({username: event.target.value})
    const handlePassword = (event) => setPassword({password: event.target.value})
    const handleImageUrl = (event) => setImageUrl({imageUrl: event.target.value})
    const handleAddress = (event) => setAddress({address: event.target.value})
    const handleEmail = (event) => setEmail({email: event.target.value})

    const validateEmail = (email) => {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return reg.test(email.toString().toLowerCase())
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (validateEmail(email.email)) {
            try {
                const response = await fetch('users/register', {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                    body: JSON.stringify({
                        name: name.name,
                        username: username.username, 
                        imageUrl: imageUrl.imageUrl,
                        address: address.address,
                        email: email.email,
                        password: password.password
                    })
                })
                const create = await response.json()
                if (create.response === 'user-created') {
                    setError('Success! You are now being logged in.')
                    localStorage.setItem('loggedIn', 'true')
                    localStorage.setItem('id', create.newUser.id.toString())
                    localStorage.setItem('name', create.newUser.name)
                    localStorage.removeItem('guestId')
                    setTimeout(() => {
                        props.methods[1]()
                        setRenderCars(true)
                    }, 1500)
                } else {
                    setError(create.response)
                }
            } catch(er) {setError(er)}
        } else {
            setError('Not a valid email')
        }
    }

    return (
        <div id='register-form-div'>
            <button id='close-register' onClick={props.methods[0]}>X</button> 
            <div id='register-form-div-items'>
            <h3 id='register-header'>Create an Account</h3> 
            <p id='error-message-register'>{error}</p>   
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Full Name' value={name.name} onChange={handleName} required/>
                <br></br>
                <input type='text' placeholder='Username' value={username.username} onChange={handleUsername} required/>
                <br></br>
                <input type='password' placeholder='Password' value={password.password} onChange={handlePassword} required/>
                <br></br>
                <input type='text' placeholder='Address' value={address.address} onChange={handleAddress} required/>
                <br></br>
                <input type='text' placeholder='Email' value={email.email} onChange={handleEmail} required/>
                <br></br>
                <input type='text' placeholder='Profile Pic Url (optional)' value={imageUrl.imageUrl} onChange={handleImageUrl}/>
                <br></br>
                <button id='register-button' type='submit'>Create</button>   
            </form>
            </div>
            {renderCars ? <Redirect to={'/cars'}/> : null}
        </div>
    )
}