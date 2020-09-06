import React, {useEffect, useState} from 'react'
import '../cmp-styles/OrderSummary.css'

export default function OrderSummary(props) {
    // const [state, setState] = useState({
    //     order: []
    // })

    // const getOrders = async() => {
    //     let orderRoute = ''
    //     let id = ''
    //     if (localStorage.getItem('id') === null) {
    //         id = localStorage.getItem('guestId')
    //         orderRoute = 'guestOrder'
    //     } else {
    //         id = localStorage.getItem('id')
    //         orderRoute = 'order'
    //     }
    //     try {
    //         const response = await fetch(`${orderRoute}/recent/${id}`)
    //         const orderData = await response.json()
    //         setState({
    //             order: orderData
    //         })
    //     } catch(er) {console.log(er)}
    // }
    // useEffect(()=> {
    //     getOrders()
    // },[])

    return (
        <div id='order-summary-main-div'>
            <h1>Order Placed!</h1>
            <h2>Customer Name: {props.data.name}</h2>
            <h2>Total: ${props.data.total}00.00</h2>
            <h2>Shipping To: {props.data.address}</h2>
            <h2>Estimated Arrival: 5-7 business days</h2>
        </div>
    )
}