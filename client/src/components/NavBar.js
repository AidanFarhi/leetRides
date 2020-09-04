
import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import '../cmp-styles/NavBar.css'

export default function NavBar(props) {
    console.log('rendered')
    const [text, setText] = useState('')
    const [loggedIn, setStatus] = useState(props.methods[2])
    const [renderResults, setRender] = useState(false)

    const handleChange = (event) => {
        setText(event.target.value)
        event.preventDefault()
    }
    const search = async (event) => {
        triggerRender()
    }
    const triggerRender = () => {
        setRender(true)
    }

    useEffect(()=> {
        if (localStorage.getItem('loggedIn') === 'true') {
            setStatus(true)
        } else {
            setStatus(false)
        }    
    },[])

    return (
        <div className='nav-main-div'>
            <Link id='header-link' to='/'><h1>LeetRides</h1></Link>
            <form id='search-form' onSubmit={search}>
                <input id='search-input' type='text' 
                    placeholder='Find your ride..' 
                    value={text}
                    onChange={handleChange}
                    />
                <button id='search' type='submit'></button>
            </form>
            <div className='links-div'>
            <Link to='/cars' id='cars'></Link>
            <Link to='/drivers' id='drivers'></Link>
            <Link to='/cart' id='cart'></Link>
            {loggedIn ? 
                <button id='logout' onClick={props.methods[1]}>logout</button>
                :
                <button id='login' onClick={props.methods[0]}>login</button>
            }
            {renderResults ? <Redirect to={`/search/${text}`} /> : null}
            </div>
        </div>
    )
}
