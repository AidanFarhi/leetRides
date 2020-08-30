import React, {useState, useEffect} from 'react'
import '../cmp-styles/Home.css'
import {Login, NavBar} from '../components'
import Routes from '../Routes'

export default function Home() {
    const [state, setState] = useState({
        loggedIn: false,
        uerId: null
    })

    return(
        <div id='home-main-div'>
            <NavBar />
            This is the home page
            <Login />
            <Routes />
        </div>
    )
}