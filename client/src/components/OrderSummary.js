import React from 'react'
import '../cmp-styles/OrderSummary.css'

export default function OrderSummary(props) {
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