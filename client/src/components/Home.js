import React, {useEffect} from 'react'
import '../cmp-styles/Home.css'
import '../cmp-styles/NavBar.css'
import {NavBar} from '../components'
import Routes from '../Routes'

export default function Home() {
    
    useEffect(()=> {
        if (localStorage.getItem('loggedIn') === undefined || localStorage.getItem('loggedIn') == null) {
            localStorage.setItem('loggedIn', 'false')
        }
    })

    return(
        <div id='home-main-div'>
            <NavBar />
            <Routes />
        </div>
    )
}