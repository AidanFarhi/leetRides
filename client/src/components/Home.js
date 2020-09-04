import React, {useState, useEffect} from 'react'
import '../cmp-styles/Home.css'
import '../cmp-styles/NavBar.css'
import {Login, NavBar} from '../components'
import Routes from '../Routes'

export default function Home() {
    const [state, setState] = useState({
        loggingIn: false,
        loggedIn: false,
        userName: '',
        userId: null
    })

    const startLogin = () => {
        setState({
            loggingIn: true,
            loggedIn: false,
            userName: '',
            userId: null
        })
    }
    const login = (user) => {
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('name', user.name)
        localStorage.setItem('id', user.id)
        localStorage.removeItem('guestId')
        setState({
            loggingIn: false,
            loggedIn: true,
            userName: user.name,
            userId: user.id
        })
    }
    const logout = () => {
        console.log('logged out')
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('name')
        localStorage.removeItem('id')
        setState({
            loggingIn: false,
            loggedIn: false,
            userName: '',
            userId: null
        })
    }

    useEffect(()=> {
        if (localStorage.getItem('loggedIn') === 'true') {
            setState({
                loggedIn: true,
                loggingIn: false,
                userName: localStorage.getItem('name'),
                userId: localStorage.getItem('id')
            })
        }
    },[])

    // these get passed to the navbar component
    const methods = [startLogin, logout, state.loggedIn]
    return(
        <div id='home-main-div'>
            <NavBar methods={methods}/>
            {state.loggingIn ? <Login status={state.loggedIn} method={login} />: null}
            <Routes />
        </div>
    )
}