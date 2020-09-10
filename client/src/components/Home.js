import React, {useState, useEffect} from 'react'
import '../cmp-styles/Home.css'
import '../cmp-styles/NavBar.css'
import {NavBar} from '../components'
import Routes from '../Routes'

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            cartCount: 0,
            methods: [
                this.addToCart,
                this.takeAwayFromCart
            ]
        }
    }

    addToCart = () =>  {
        this.setState({   
            cartCount: this.state.cartCount + 1
        })
    }
    takeAwayFromCart = () => {
        this.setState({
            cartCount: this.state.cartCount - 1
        })
    }
    getDataGuest = async() => {
        try {
            const response = await fetch(`guestCart/${localStorage.getItem('guestId')}`)
            const data = await response.json()
            this.setState({
                cartCount: data.length
            })
        } catch(er) {console.log(er)}
    }
    getData = async() => {
        try {
            const response = await fetch(`cart/${localStorage.getItem('id')}`)
            const data = await response.json()
            this.setState({
                cartCount: data.length
            })
        } catch(er) {console.log(er)}
    }
    
    componentDidMount() {
        if (localStorage.getItem('guestId') === null && localStorage.getItem('id') === null) {
            this.getData()
        } else if (localStorage.getItem('guestId') === null) {
            this.getData()
        } else {
            this.getDataGuest()
        }
        if (localStorage.getItem('loggedIn') === undefined || localStorage.getItem('loggedIn') == null) {
            localStorage.setItem('loggedIn', 'false')
        }
    }

    render() {
        return(
            <div id='home-main-div'>
                <p id='main-home-banner'>Find Your Drive</p>
                <NavBar data={this.state.cartCount}/>
                <Routes methods={this.state.methods} />
            </div>
        )
    }
}
