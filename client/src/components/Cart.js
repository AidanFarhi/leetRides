import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../cmp-styles/Cart.css'

export default function Cart(props) {
    // props.method === takeAwayFromCart()
    const [state, setState] = useState({
        cars: [],
        total: 0,
    })

    const removeItemGuest = async(id) => {
        try {
            const response = await fetch('guestCart/remove', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                body: JSON.stringify({id: localStorage.getItem('guestId'), itemId: id})
            })
            const result = await response.json()
            if (result.response === 'item-deleted-guest') getDataGuest()
        } catch(er) {console.log(er)}
    }

    const removeItem = async(id) => {
        // takeAwayFromCart()
        props.method()
        if (localStorage.getItem('id') === null) {
            removeItemGuest(id)
            return
        }
        try {
            const response = await fetch('cart/remove', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                body: JSON.stringify({userId: localStorage.getItem('id'), itemId: id})
            })
            const result = await response.json()
            if (result.response === 'item-deleted') getData()
        } catch(er) {console.log(er)}
    }

    const getDataGuest = async() => {
        try {
            const response = await fetch(`guestCart/${localStorage.getItem('guestId')}`)
            const data = await response.json()
            const prices = data.map(car => car.price)
            const reducer = (a, b) => a + b
            if (prices.length === 0) {
                setState({
                    total: 0
                })
            }
            const totalCost = prices.reduce(reducer)
            setState({
                cars: data.map((car, i) => {
                    return(
                        <div className='cart-item' key={i}>
                            <img src={car.imageUrl} alt='a nice car'></img>
                            <Link key={i} to={{pathname:`/car/${car.id}`}}><h3>{car.name}</h3></Link>
                            <p>${car.price}.00</p>
                            <button onClick={()=> removeItem(car.id)}>Delete</button>
                        </div>
                    )
                }),
                total: totalCost
            })
        } catch(er) {console.log(er)}
    }

    const getData = async() => {
        try {
            const response = await fetch(`cart/${localStorage.getItem('id')}`)
            const data = await response.json()
            const prices = data.map(car => car.price)
            const reducer = (a, b) => a + b
            if (prices.length === 0) {
                setState({
                    total: 0
                })
            }
            if (prices.length > 0) {
                const totalCost = prices.reduce(reducer)
                setState({
                    cars: data.map((car, i) => {
                        return(
                            <div className='cart-item' key={i}>
                                <img src={car.imageUrl} alt='a nice car'></img>
                                <Link key={i} to={{pathname:`/car/${car.id}`}}><h3>{car.name}</h3></Link>
                                <p>${car.price}.00</p>
                                <button onClick={()=> removeItem(car.id)}>Delete</button>
                            </div>
                        )
                    }),
                    total: totalCost
                })
            }
        } catch(er) {console.log(er)}
    }
    
    useEffect(()=> {
        if (localStorage.getItem('guestId') === null && localStorage.getItem('id') === null) {
            getData()
        } else if (localStorage.getItem('guestId') === null) {
            getData()
        } else {
            getDataGuest()
        }
    },[])

    return (
        <div id='cart-main-div'>
            <h1 id='cart-header'>{state.total === 0 ? 'Cart Empty' : 'Your Cart'}</h1>
            {state.cars}
            {state.total === 0 ? null : 
            <div id='total-div'>
                <h3 id='total-header'>Total:</h3><p>${state.total}.00</p>
            </div>
            }
            {state.total === 0 ? null : <Link id='checkout-link' to='/checkout'>Checkout</Link>}
            
        </div>
    )
}
