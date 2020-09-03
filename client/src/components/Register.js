import React, {useState} from 'react'

export default function Register(props) {
    const [name, setName] = useState({name: ''})
    const [username, setUsername] = useState({username: ''})
    const [password, setPassword] = useState({password: ''})
    const [imageUrl, setImageUrl] = useState({imageUrl: ''})
    const [address, setAddress] = useState({address: ''})
    const [email, setEmail] = useState({email: ''})

    const handleName = (event) => setName({name: event.target.value})
    const handleUsername = (event) => setUsername({username: event.target.value})
    const handlePassword = (event) => setPassword({password: event.target.value})
    const handleImageUrl = (event) => setImageUrl({imageUrl: event.target.value})
    const handleAddress = (event) => setAddress({address: event.target.value})
    const handleEmail = (event) => setEmail({email: event.target.value})
    
    const handleSubmit = async (event) => {
        event.preventDefault()
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
                props.method(create.newUser)
            }
        } catch(er) {console.log(er)}
    }

    return (
        <div id='register-form-div'>
            <div id='register-form-div-items'>
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
                <button type='submit'>Create</button>   
            </form>
            </div>
        </div>
    )
}