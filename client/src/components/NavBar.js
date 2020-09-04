
import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import '../cmp-styles/NavBar.css'

export default function NavBar() {
    const [text, setText] = useState('')
    const [loggedIn, setLoginStatus] = useState(false)
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

    const logout = () => {
        localStorage.setItem('loggedIn', 'false')
        setLoginStatus(false)
    }

    useEffect(()=> {
        if (localStorage.getItem('loggedIn') === 'true') {
            setLoginStatus(true)
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
                <button id='logout' onClick={logout}>logout</button> 
                :
                <Link id='login' to='/login'>login</Link>
            }
            {renderResults ? <Redirect to={`/search/${text}`} /> : null}
            </div>
        </div>
    )
}
