import React, {useState, useEffect} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import OrderSummary from './OrderSummary'
import CardSection from './CardSection';
import '../cmp-styles/Payment.css'

export default function Payment() {
    const elements = useElements();
    const [error, setError] = useState(null)
    const [clientSecret, setClientSecret] = useState('');
    const [status, setSuccess] = useState({processed: false})
    const [renderGuestRegister, setRenderGuestRegister] = useState(false)
    const [name, setName] = useState(localStorage.getItem('name') || '')
    const [orderSummary, setOrderSummary] = useState({})
    const [renderUserPayment, setRenderUserPayment] = useState(false)
    const [guestName, setGuestName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    
    const stripe = useStripe()

    const handleGuestName = (event) => setGuestName(event.target.value)
    const handleAddress = (event) => setAddress(event.target.value)
    const handleEmail = (event) => setEmail(event.target.value)

    const getItems = async() => {
        let id = ''
        let cart = ''
        if (localStorage.getItem('id') === null) {
            id = localStorage.getItem('guestId')
            cart = 'guestCart'
        } else {
            id = localStorage.getItem('id')
            cart = 'cart'
        }
        try {
            const response = await fetch(`${cart}/${id}`)
            const data = await response.json()
            return data
        } catch(er) {console.log(er)}
    }

    const makePaymentIntent = async(items) => {
        try {
            const itemData = await items
            const response = await fetch('/pay', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                body: JSON.stringify({items: itemData})
            })
            const result = await response.json()
            setClientSecret(result.clientSecret)
        } catch(er) {console.log(er)}
    }

    const makeGuest = async() => {
        try {
            const response = await fetch('guest/update', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                body: JSON.stringify({
                    id: Number(localStorage.getItem('guestId')),
                    name: guestName,
                    address: address,
                    email: email,
                })
            })
            const orderResult = await response.json()
            console.log('guest Order Result', orderResult)
            if (orderResult.response === 'guest-updated') {
                // setName(orderResult[0].order.guest.name)
                // renderGuestRegister(false)
            }
        } catch(er) {setError(er)}
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (renderGuestRegister) {
            makeGuest()
        }    
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: name,
                },
            }
        })
        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            setError(result.error.message)
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            //this is where the order gets placed
            if (result.paymentIntent.status === 'succeeded') {
                if (localStorage.getItem('loggedIn') === 'true') {
                    const makeOrder = await fetch('/order', {
                        method: 'POST',
                        headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                        body: JSON.stringify({userId: Number(localStorage.getItem('id'))})
                    })
                    const result = await makeOrder.json()
                    if (result.response === 'order-placed') {
                        setOrderSummary(result.order)
                        setSuccess({processed: true})
                    }
                } else {
                    const makeOrder = await fetch('/guestOrder', {
                        method: 'POST',
                        headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                        body: JSON.stringify({guestId: Number(localStorage.getItem('guestId'))})
                    })
                    const result = await makeOrder.json()
                    if (result.response === 'order-placed') {
                        console.log(result)
                        setOrderSummary(result.order)
                        setSuccess({processed: true})
                    }
                }
            }
        }
    }; 
    
    useEffect(()=> {
        if (localStorage.getItem('guestId') !== null) setRenderGuestRegister(true)
        if (localStorage.getItem('loggedIn') === 'true') setRenderUserPayment(true)
        if (!status.processed) {
            const items = getItems()
            makePaymentIntent(items)
        } 
     }, [])

    return (
        status.processed ? <OrderSummary data={orderSummary} />
        :
        <form id='payment-form' onSubmit={handleSubmit}>
            {renderGuestRegister ? 
            <div id='register-guest-form-div-items'>
                <h3 id='register-guest-header'>Enter Information</h3>    
                <input type='text' placeholder='Full Name' value={guestName} onChange={handleGuestName} required/>
                <br></br>
                <input type='text' placeholder='Address' value={address} onChange={handleAddress} required/>
                <br></br>
                <input type='text' placeholder='Email' value={email} onChange={handleEmail} required/>
                <br></br>
             </div>
            : null}
            <h3>{error}</h3>
            {renderUserPayment ? <CardSection /> : null}
            {renderUserPayment ? <button disabled={!stripe}>Make Payment</button> : null}
            {renderGuestRegister ? <CardSection /> : null}
            {renderGuestRegister ? <button disabled={!stripe}>Make Payment</button> : null}
        </form>  
    )
}