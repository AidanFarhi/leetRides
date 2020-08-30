import React, {useState, useEffect} from 'react'
import '../cmp-styles/Home.css'
import {Login, NavBar} from '../components'
import Routes from '../Routes'

export default function Home() {
    const [state, setState] = useState({
        loggedIn: false,
        userName: '',
        userId: null
    })

    const login = (user) => {
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('name', user.name)
        localStorage.setItem('id', user.id)
        setState({
            loggedIn: true,
            userName: user.name,
            userId: user.id
        })
    }
    const loginGuest = () => {
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('name', 'guest')
        localStorage.setItem('id', 'none')
        setState({
            loggedIn: true,
            userName: 'guest',
            userId: 'none'
        })
    }
    const logout = () => {
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('name')
        localStorage.removeItem('id')
        setState({
            loggedIn: false,
            userName: '',
            userId: null
        })
    }

    useEffect(()=> {
        if (localStorage.getItem('loggedIn') === 'true') {
            setState({
                loggedIn: true,
                userName: localStorage.getItem('name'),
                userId: localStorage.getItem('id')
            })
        }
    }, [])

    // these get passed to the login component
    const methods = [login, loginGuest]

    return(
        <div id='home-main-div'>
            <NavBar method={logout}/>
            This is the home page
            {!state.loggedIn ? <Login methods={methods}/> : null}
            <Routes />
        </div>
    )
}