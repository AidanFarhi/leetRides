
import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Login} from '../components'
import '../cmp-styles/NavBar.css'

export default function NavBar() {
    const [text, setText] = useState('')
    const [loggedIn, setLoginStatus] = useState(false)
    const [renderResults, setRender] = useState(false)
    const [renderLogin, setLoginRender] = useState(false)
    const [renderHome, setRenderHome] = useState(false)

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
        localStorage.removeItem('id')
        setLoginStatus(false)
        setRenderHome(true)
    }
    const triggerLoginRender = () => {
        setLoginRender(true)
    }

    // these methods get passed to Login component
    const login = () => {
        setLoginStatus(true)
        setLoginRender(false)
    }
    const closeLogin = () => {
        setLoginRender(false)
    }
    const methods = [login, closeLogin]

    useEffect(()=> {
        if (renderHome) setRenderHome(false)
        if (localStorage.getItem('loggedIn') === 'true') {
            setLoginStatus(true)
        }    
    },[renderHome === true])

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
                <button id='login' onClick={triggerLoginRender}>login</button>
            }
            {renderResults ? <Redirect to={`/search/${text}`} /> : null}
            {renderLogin ? <Login methods={methods}/> : null}
            {renderHome ? <Redirect to='/' /> : null}
            </div>
        </div>
    )
}
