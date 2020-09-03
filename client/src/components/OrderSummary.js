import React, {useEffect, useState} from 'react'
import '../cmp-styles/OrderSummary.css'

export default function OrderSummary(props) {
    const [state, setState] = useState({
        order: []
    })
    useEffect(()=> {
        const getOrders = async() => {
            try {
                const response = await fetch(`order/recent/${props.location.state.id}`)
                const orderData = await response.json()
                setState({
                    order: orderData
                })
            } catch(er) {console.log(er)}
        }
        getOrders()
    },[])

    return (
        <div id='order-summary-main-div'>
            
            <h2>Customer Name: {state.order.name}</h2>
            <h2>Total: ${state.order.total}.00</h2>
            <h2>Shipping To: {state.order.address}</h2>
            <h2>Estimated Arrival: 5-7 business days</h2>
            
        </div>
    )
}