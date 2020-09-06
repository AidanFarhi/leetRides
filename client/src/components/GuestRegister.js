import React, {useState} from 'react'
import '../cmp-styles/GuestRegister.css'

export default function GuestRegister(props) {
    const [name, setName] = useState({name: ''})
    const [address, setAddress] = useState({address: ''})
    const [email, setEmail] = useState({email: ''})

    const handleName = (event) => setName({name: event.target.value})
    const handleAddress = (event) => setAddress({address: event.target.value})
    const handleEmail = (event) => setEmail({email: event.target.value})

    return (
        <div id='register-guest-form-div'>
            <div id='register-guest-form-div-items'>
                <h3 id='register-guest-header'>Enter Information</h3>    
                    <input type='text' placeholder='Full Name' value={name.name} onChange={handleName} required/>
                    <br></br>
                    <input type='text' placeholder='Address' value={address.address} onChange={handleAddress} required/>
                    <br></br>
                    <input type='text' placeholder='Email' value={email.email} onChange={handleEmail} required/>
                    <br></br>
            </div>
        </div>
    )
}