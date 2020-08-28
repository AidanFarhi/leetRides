import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
export default function NavBar() {
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
            <h1>LeetRides</h1>
            <form id='search-form' onSubmit={search}>
                <input type='text' 
                    placeholder='Find your ride..' 
                    value={state.text}
                    onChange={handleChange}
                    />
                <button type='submit'>Search</button>
            </form>
            <div className='links-div'>
                <Link>Cars</Link>
                <Link>Drivers</Link>
                <Link>Cart</Link>
            </div>
            <h1>
                {state.text}
            </h1>
        </div>
    )
}