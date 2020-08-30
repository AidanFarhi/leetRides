import React, {useState} from 'react'

export default function Register(props) {
    const [username, setUsername] = useState({username: ''})
    const [password, setPassword] = useState({password: ''})
    const [imageUrl, setImageUrl] = useState({imageUrl: ''})
    const [address, setAdress] = useState({address: ''})
    const [email, setEmail] = useState({address: ''})

    const handleUsername = (event) => setUsername({username: event.target.value})
    const handlePassword = (event) => setPassword({password: event.target.value})
    const handleImageUrl = (event) => setImageUrl({imageUrl: event.target.value})
    const handleAdress = (event) => setAdress({address: event.target.value})
    const handleEmail = (event) => setEmail({email: event.target.value})
    
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('users/register', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                body: JSON.stringify({
                    name: username.username, 
                    imageUrl: imageUrl.imageUrl,
                    address: address.address,
                    email: email.email,
                    password: password.password
                })
            })
            const create = await response.json()
            if (create.result === 'user-created') {
                props.method(create.newUser)
            }
        } catch(er) {console.log(er)}
    }

    return (
        <div id='register-form-div'>
            <h1>Welcome</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' value={username.username} onChange={handleUsername} required/>
                <input type='password' placeholder='Password' value={password.password} onChange={handlePassword} required/>
                <input type='text' placeholder='Adress' value={address.address} onChange={handleAdress} required/>
                <input type='text' placeholder='Email' value={email.email} onChange={handleEmail} required/>
                <input type='text' placeholder='Profile Pic Url' value={imageUrl.imageUrl} onChange={handleImageUrl} required/>
                <button type='submit'>Create</button>   
            </form>
            <h1>{username.username}</h1>
            <h2>{password.password}</h2>
            <h1>{imageUrl.imageUrl}</h1>
            <h2>{address.address}</h2>
            <h2>{email.email}</h2>
            <hr></hr>
        </div>
    )
}