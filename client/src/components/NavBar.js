import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import '../cmp-styles/NavBar.css'

export default function NavBar(props) {
    const [state, setState] = useState({
        text: ''
    })

    const handleChange = (event) => {
        setState({
            text: event.target.value
        })
    }
    const search = (event) => {
        event.preventDefault()
        console.log(state.text)
        setState({
            text: ''
        })
    }

    return (
        <div className='nav-main-div'>
            <Link id='header-link' to='/'><h1>LeetRides</h1></Link>
            <form id='search-form' onSubmit={search}>
                <input id='search-input' type='text' 
                    placeholder='Find your ride..' 
                    value={state.text}
                    onChange={handleChange}
                    />
                <button id='search' type='submit'></button>
            </form>
            <div className='links-div'>
            <Link to='/cars' id='cars'></Link>
            <Link to='/drivers' id='drivers'></Link>
            <Link to='/cart' id='cart'></Link>
            <button id='logout' onClick={props.method}>Logout</button>
            </div>
        </div>
    )
}