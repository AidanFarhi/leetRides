import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function Checkout() {
    const [state, setState] = useState({
        total: 0,
        cartListItems: [],
    })

    useEffect(()=> {
       if (!state.redirect) {
           const getCart = async() => {
               try {
                    const response = await fetch(`cart/${localStorage.getItem('id')}`)
                    const data = await response.json()
                    const listItems = data.map((car, i) => <li key={i}>{car.name} - {car.price}</li>)
                    const prices = data.map(car => car.price)
                    const reducer = (a, b) => a + b;
                    const totalCost = prices.reduce(reducer)
                    setState({
                        total: totalCost,
                        cartListItems: listItems
                    })
               } catch(er) {console.log(er)}
           } 
           getCart()
       } 
    }, [])

    return (
        <div>
            <h1>Checkout</h1>
            <ul>
                {state.cartListItems}
            </ul>
            <h2>Your total is: ${state.total}.00</h2>
            <Link to='/pay'>Process Payment</Link>
        </div>
    )
}