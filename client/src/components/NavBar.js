import React, {useState, useEffect} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Login, Register} from '../components'
import menu from '../cmp-styles/icons/menu.png'
import '../cmp-styles/NavBar.css'

export default function NavBar(props) {
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
        closeMenu()
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
    const login = (id) => {
        // setUserId(id)
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

    // navbar methods
    const openMenu = () => {
        // handle different screen widths
        if (window.innerWidth > 1040) {
            document.getElementById('links-div').style.width = '10%';
        } else if (window.innerWidth >= 768) {
            document.getElementById('links-div').style.width = '20%'
        } else {
            document.getElementById('links-div').style.width = '100%'
        }
    }
    const closeMenu = () => {
        document.getElementById('links-div').style.width = '0';
    }

    useEffect(()=> {
        if (renderHome) setRenderHome(false)
        if (localStorage.getItem('loggedIn') === 'true') {
            setLoginStatus(true)
        }    
    },[renderHome === true])

    return (
        <div className='nav-main-div'>

            <div id='cover'></div>
            <Link onClick={closeMenu} id='header-link' to='/'><h1 id='leetrides-header'>LeetRides</h1></Link>
            <form id='search-form' onSubmit={search}>
                <input id='search-input' type='text' 
                    placeholder='Find your ride..' 
                    value={text}
                    onChange={handleChange}
                    required
                    />
                <button id='search' type='submit'></button>
            </form>

            <img src={menu} id='buger-menu' onClick={openMenu}></img>

            <div id='links-div'>
                <button id='close-button' onClick={closeMenu}>X</button>
                <Link className='nav-link' onClick={closeMenu} to='/cars' id='cars'>Cars</Link>
                <div id='cart-div'>
                    <Link className='nav-link' onClick={closeMenu} to='/cart' id='cart'>
                        <span id='cart-count'>{props.data}</span>
                    </Link>
                </div>
                {loggedIn ? 
                    <button id='logout' onClick={logout}>Logout</button> 
                    :
                    <button id='login' onClick={triggerLoginRender}>Login</button>
                }
            </div>

            {renderResults ? <Redirect to={`/search/${text}`} /> : null}
            {renderLogin ? <Login methods={loginMethods}/> : null}
            {renderHome ? <Redirect to='/' /> : null}
            {renderRegister ? <Register methods={registerMethods} /> : null}
        </div>
    )
}
