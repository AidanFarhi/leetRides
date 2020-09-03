import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../cmp-styles/Checkout.css'

export default function Checkout() {
    const [state, setState] = useState({
        total: 0,
        cartListItems: [],
    })
    const getCart = async() => {
        try {
            const response = await fetch(`cart/${localStorage.getItem('id')}`)
            const data = await response.json()
            const listItems = data.map((car, i) => <li key={i}>{car.name} - ${car.price}.00</li>)
            const prices = data.map(car => car.price)
            const reducer = (a, b) => a + b;
            const totalCost = prices.reduce(reducer)
            setState({
                total: totalCost,
                cartListItems: listItems
            })
        } catch(er) {console.log(er)}
    } 

    const getGuestCart = async () => {
        try {
            const response = await fetch(`guestCart/${localStorage.getItem('guestId')}`)
            const data = await response.json()
            const listItems = data.map((car, i) => <li key={i}>{car.name} - ${car.price}.00</li>)
            const prices = data.map(car => car.price)
            const reducer = (a, b) => a + b;
            const totalCost = prices.reduce(reducer)
            setState({
                total: totalCost,
                cartListItems: listItems
            })
        } catch(er) {console.log(er)}
    }

    useEffect(()=> {
        if (localStorage.getItem('id') !== null) {
            getCart()
        } else {
            getGuestCart()
        }
    }, [])

    return (
        <div id='main-checkout-div'>
            <h1 id='checkout-header'>Checkout</h1>
            <ul>
                {state.cartListItems}
            </ul>
            <h2>Your total is: ${state.total}.00</h2>
            <Link to='/pay'>Process Payment</Link>
        </div>
    )
}