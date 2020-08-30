import React, {useState} from 'react'
import {Link} from 'react-router-dom'
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
            <Link to='/'><h1>LeetRides</h1></Link>
            <form id='search-form' onSubmit={search}>
                <input type='text' 
                    placeholder='Find your ride..' 
                    value={state.text}
                    onChange={handleChange}
                    />
                <button type='submit'>Search</button>
            </form>
            <div className='links-div'>
                <Link to='/cars'>Cars</Link>
                <Link to='/drivers'>Drivers</Link>
                <Link to='/cart'>Cart</Link>
                <button onClick={props.method}>Logout</button>
            </div>
            <h1>
                {state.text}
            </h1>
        </div>
    )
}