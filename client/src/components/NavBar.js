
import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Login, Register} from '../components'
import '../cmp-styles/NavBar.css'

export default function NavBar() {
    const [text, setText] = useState('')
    const [loggedIn, setLoginStatus] = useState(false)
    const [renderResults, setSearchRender] = useState(false)
    const [renderLogin, setLoginRender] = useState(false)
    const [renderHome, setRenderHome] = useState(false)
    const [renderRegister, setRegisterRender] = useState(false)

    const handleChange = (event) => {
        setText(event.target.value)
        event.preventDefault()
    }
    const search = async (event) => {
        triggerSearchRender()
    }
    const triggerSearchRender = () => {
        setSearchRender(true)
    }
    const logout = () => {
        localStorage.setItem('loggedIn', 'false')
        localStorage.removeItem('id')
        setLoginStatus(false)
        setRenderHome(true)
    }
    const triggerLoginRender = () => {
        cover()
        setLoginRender(true)
        setRenderHome(true)
    }
    const cover = () => {
        document.getElementById('cover').style.display = 'block'
    }
    const uncover = () => {
        document.getElementById('cover').style.display = 'none' 
    }
    // these methods get passed to <Login/> component
    const login = () => {
        setLoginStatus(true)
        setLoginRender(false)
        setRegisterRender(false)
        uncover()
    }
    const closeLogin = () => {
        uncover()
        setLoginRender(false)
    }
    const triggerRegisterRender = () => {
        setRegisterRender(true)
        setLoginRender(false)
    }
    const loginMethods = [login, closeLogin, triggerRegisterRender]

    // these methods get passed to <Register /> component
    const closeRegister = () => {
        setRegisterRender(false)
        setLoginRender(true)
    }
    const registerMethods = [closeRegister, login]

    useEffect(()=> {
        if (renderHome) setRenderHome(false)
        if (localStorage.getItem('loggedIn') === 'true') {
            setLoginStatus(true)
        }    
    },[renderHome === true])

    return (
        <div className='nav-main-div'>
            <div id='cover'></div>
            <Link id='header-link' to='/'><h1>LeetRides</h1></Link>
            <form id='search-form' onSubmit={search}>
                <input id='search-input' type='text' 
                    placeholder='Find your ride..' 
                    value={text}
                    onChange={handleChange}
                    required
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
            {renderLogin ? <Login methods={loginMethods}/> : null}
            {renderHome ? <Redirect to='/' /> : null}
            {renderRegister ? <Register methods={registerMethods} /> : null}
            </div>
        </div>
    )
}
