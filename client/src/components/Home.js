import React from 'react'
import '../cmp-styles/Home.css'
import './Login'
import Login from './Login'

export default function Home() {
    return(
        <div id='home-main-div'>
            This is the home page
            <Login />
        </div>
    )
}