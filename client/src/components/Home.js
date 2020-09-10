import React, {useState, useEffect} from 'react'
import '../cmp-styles/Home.css'
import '../cmp-styles/NavBar.css'
import {NavBar} from '../components'
import Routes from '../Routes'

export default function Home() {
    const [cartCount, setCartCount] = useState(0)

    const addToCart = () => setCartCount(cartCount + 1)
    const takeAwayFromCart = () => {
        console.log('item deleted')
        if (cartCount === 1) {
            setCartCount(0)
        } else {
            setCartCount(cartCount - 1)
        }
    }    
    
    // these are passed to the <Routes/> component
    const methods = [addToCart, takeAwayFromCart]

    const getDataGuest = async() => {
        try {
            const response = await fetch(`guestCart/${localStorage.getItem('guestId')}`)
            const data = await response.json()
            setCartCount(data.length)
        } catch(er) {console.log(er)}
    }
    const getData = async() => {
        console.log('gotData home')
        try {
            const response = await fetch(`cart/${localStorage.getItem('id')}`)
            const data = await response.json()
            setCartCount(data.length)
        } catch(er) {console.log(er)}
    }
    
    useEffect(()=> {
        console.log('cart count', cartCount)
        if (localStorage.getItem('guestId') === null && localStorage.getItem('id') === null) {
            getData()
        } else if (localStorage.getItem('guestId') === null) {
            getData()
        } else {
            getDataGuest()
        }
        if (localStorage.getItem('loggedIn') === undefined || localStorage.getItem('loggedIn') == null) {
            localStorage.setItem('loggedIn', 'false')
        }
    },[])

    return(
        <div id='home-main-div'>
            <p id='main-home-banner'>Find Your Drive</p>
            <h1>{cartCount}</h1>
            <NavBar data={cartCount}/>
            <Routes methods={methods} />
        </div>
    )
}
