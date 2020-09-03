import React, {useState, useEffect} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import {Redirect} from 'react-router-dom'
import '../cmp-styles/Payment.css'

export default function Payment() {
    const elements = useElements();
    const [error, setError] = useState(null)
    const [clientSecret, setClientSecret] = useState('');
    const [status, setSuccess] = useState({processed: false})
    const stripe = useStripe()

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
    
    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: localStorage.getItem('name'),
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
                if (localStorage.getItem('guestId') === null) {
                    const makeOrder = await fetch('/order', {
                        method: 'POST',
                        headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                        body: JSON.stringify({userId: Number(localStorage.getItem('id'))})
                    })
                    const result = await makeOrder.json()
                    if (result.response === 'order-placed') {
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
                        setSuccess({processed: true})
                    }
                }
            }
        }
    }; 
    
    useEffect(()=> {
        if (!status.processed) {
            const items = getItems()
            makePaymentIntent(items)
        } 
     }, [])

    return (
        status.processed ? 
            <Redirect to={{pathname: "/summary", state: {id: localStorage.getItem('id')} }}/>
        :
        <form id='payment-form' onSubmit={handleSubmit}>
            <h3>{error}</h3>
            <CardSection />
            <button disabled={!stripe}>Make Payment</button>
        </form>  
    )
}