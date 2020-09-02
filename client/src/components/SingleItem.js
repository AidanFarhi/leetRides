import React, {useState, useEffect} from 'react'
import '../cmp-styles/SingleItem.css'

export default function SingleItem(props) {
    const [state, setState] = useState({
        carData: {}
    })

    const addItem = async() => {
        try {
            const response = await fetch('cart/add', {
                method: 'POST',
                headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                body: JSON.stringify({userId: localStorage.getItem('id'), itemId: state.carData.id})
            })
            const result = await response.json()
        } catch(er) {console.log(er)}
    }

    useEffect(()=> {
        const getData = async() => {
            try {
                const response =  await fetch(`/items/${props.location.query.id}`)
                const data = await response.json()
                localStorage.setItem('carId', `${props.location.query.id}`)
                setState({
                    carData: data[0]
                })
            } catch(er) {console.log(er)}
        }
        getData()
    },[])

    return(
        <div>
            <div className='single-car-div'>
                <img id='car-image' src={state.carData.imageUrl} alt='a sweet ride'></img>
                <h3>{state.carData.name}</h3>
                <h3>${state.carData.price}.00</h3>
                <h3>{state.carData.description}</h3>
                <br></br>
                <button onClick={addItem}>Add to cart</button>
            </div>
        </div>
    )
}

