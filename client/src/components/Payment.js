import React, {useState, useEffect} from 'react'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import {Redirect} from 'react-router-dom'

export default function Payment() {
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [status, setSuccess] = useState({processed: false})
    const stripe = useStripe()

    const getItems = async() => {
        try {
            const response = await fetch(`cart/${localStorage.getItem('id')}`)
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
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                const makeOrder = await fetch('/order', {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                    body: JSON.stringify({userId: Number(localStorage.getItem('id'))})
                })
                if (makeOrder.response === 'order-placed') {
                    setSuccess({processed: true})
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
            <Redirect to="/"/>
        :
        <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!stripe}>Confirm order</button>
        </form>  
    )
}