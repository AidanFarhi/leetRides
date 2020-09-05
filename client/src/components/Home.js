import React from 'react'
import '../cmp-styles/Home.css'
import '../cmp-styles/NavBar.css'
import {NavBar} from '../components'
import Routes from '../Routes'

export default function Home() {
    
    return(
        <div id='home-main-div'>
            <NavBar />
            <Routes />
        </div>
    )
}