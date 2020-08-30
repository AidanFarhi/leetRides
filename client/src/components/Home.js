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

    useEffect(()=> {
        if (localStorage.getItem('loggedIn') === 'true') {
            setState({
                loggedIn: true,
                userName: localStorage.getItem('name'),
                userId: localStorage.getItem('id')
            })
        }
    }, [])

    return(
        <div id='home-main-div'>
            <NavBar />
            This is the home page
            {!state.loggedIn ? <Login method={login}/> : null}
            <Routes />
        </div>
    )
}