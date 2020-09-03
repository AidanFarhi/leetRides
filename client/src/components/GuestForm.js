import React, {useState} from 'react'

export default function GuestForm(props) {
    const [name, setName] = useState({name: ''})
    const [address, setAddress] = useState({address: ''})
    const [email, setEmail] = useState({email: ''})

    const handleName = (event) => setName({name: event.target.value})
    const handleAddress = (event) => setAddress({address: event.target.value})
    const handleEmail = (event) => setEmail({email: event.target.value})
    
    const handleSubmit = async(event) => {
        try {
            const response = await fetch('guest/update', {
            method: 'POST',
            headers: {'Accept': 'application/json','Content-Type': 'application/json',},
            body: JSON.stringify({
                id: localStorage.getItem('guestId'),
                name: name.name,
                email: email.email,
                address: address.address
            })
        })
        const result = await response.json()
        props.method(result)
        } catch(er) {console.log(er)}
    }

    return (
        <div id='register-form-div'>
            <div id='register-form-div-items'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Full Name' value={name.name} onChange={handleName} required/>
                <br></br>
                <input type='text' placeholder='Address' value={address.address} onChange={handleAddress} required/>
                <br></br>
                <input type='text' placeholder='Email' value={email.email} onChange={handleEmail} required/>
                <br></br>
                <button type='submit'>Create</button>   
            </form>
            </div>
        </div>
    )
}