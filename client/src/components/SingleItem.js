import React, {useState, useEffect} from 'react'
import '../cmp-styles/SingleItem.css'

export default function SingleItem(props) {
    const [state, setState] = useState({
        carData: {},
    })

    // check local storage to see if guest is logged in or not
    // if so, then post to guest cart
    const addItem = async() => {
        if (localStorage.getItem('guestId') === null && localStorage.getItem('id') === null) {
            addItemGuest()
            return
        } else if (localStorage.getItem('id') === null) {
            addItemGuest()
            return
        }
        try {
            const response = await fetch('cart/add', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                body: JSON.stringify({userId: localStorage.getItem('id'), itemId: state.carData.id})
            })
            const result = await response.json()
            console.log(result)
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
                    body: JSON.stringify({guestId: resultGuest.newGuest.id, itemId: state.carData.id})
                })
                const result = await newGuestCartResponse.json()
                console.log(result)
                localStorage.setItem('guestId', resultGuest.newGuest.id)
                return
            } else {
                const guestCartResponse = await fetch('guestCart/add', {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                    body: JSON.stringify({guestId: localStorage.getItem('guestId'), itemId: state.carData.id})
                })
                const result = await guestCartResponse.json()
                console.log(result)
            }
        } catch(er) {console.log(er)}
    }
    const getData = async() => {
        let id = ''
        if (localStorage.getItem('carId') === null) {
            id = props.location.query.id
        } else {
            id = localStorage.getItem('carId')
        }
        try {
            const response =  await fetch(`/items/${id}`)
            const data = await response.json()
            localStorage.setItem('carId', `${id}`)
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
                    <button onClick={addItem}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

