import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import '../cmp-styles/SingleItem.css'

export default function SingleItem(props) {
    // props.method === addToCart()
    const [state, setState] = useState({
        carData: {},
    })
    const {id} = useParams()

    const clickAnimation = () => {
        document.getElementById('add-to-cart-button').classList.add('clicked')
    }
    // check local storage to see if guest is logged in or not
    // if so, then post to guest cart   
    const addItem = async() => {
        // addToCart()
        props.method()
        clickAnimation()
        if (localStorage.getItem('guestId') === null && localStorage.getItem('id') === null) {
            addItemGuest()
        } else if (localStorage.getItem('id') === null) {
            addItemGuest()
        }
        try {
            const response = await fetch('cart/add', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                body: JSON.stringify({userId: localStorage.getItem('id'), itemId: id})
            })
            const result = await response.json()
        } catch(er) {console.log(er)}
    }

    const addItemGuest = async() => {
        try {
            if (localStorage.getItem('guestId') === null) {
                const newGuestResponse = await(fetch('guest/register', {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                    body: JSON.stringify({})
                }))
                const resultGuest = await newGuestResponse.json()
                const newGuestCartResponse = await fetch('guestCart/add', {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                    body: JSON.stringify({guestId: resultGuest.newGuest.id, itemId: id})
                })
                const result = await newGuestCartResponse.json()
                console.log(result)
                localStorage.setItem('guestId', resultGuest.newGuest.id)
                return
            } else {
                const guestCartResponse = await fetch('guestCart/add', {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                    body: JSON.stringify({guestId: localStorage.getItem('guestId'), itemId: id})
                })
                const result = await guestCartResponse.json()
                console.log(result)
            }
        } catch(er) {console.log(er)}
    }
    const getData = async() => {
        try {
            const response =  await fetch(`/items/${id}`)
            const data = await response.json()
            setState({
                carData: data[0]
            })
        } catch(er) {console.log(er)}
    }

    useEffect(()=> {
        getData()
        return function cleanup() {localStorage.removeItem('carId')}
    },[])

    return(
        <div>
            <div className='single-car-div'>
                <img id='car-image' src={state.carData.imageUrl} alt='a sweet ride'></img>
                <div id='single-car-description'>
                    <h3>{state.carData.name}</h3>
                    <h3>${state.carData.price}.00</h3>
                    <p>{state.carData.description}</p>
                    <button id='add-to-cart-button' onClick={addItem}>
                        <span id='add'>Add to cart</span>
                        <span id='added'>Item Added</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

