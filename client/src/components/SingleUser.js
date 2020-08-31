import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function SingleUser(props) {
    const [state, setState] = useState({
        userData: {},
        cart: []
    })

    useEffect(()=> {
        const getData = async() => {
            try {
                const response =  await fetch(`/users/${props.location.query.id}`)
                const data = await response.json()
                const cartResponse = await fetch(`cart/${data[0].id}`)
                const cartData = await cartResponse.json()
                const cars = cartData.map((car, i) => {
                        return(
                            <div key={i}>
                                <img src={car.imageUrl} alt='a nice car'></img>
                                <Link key={i} to={{pathname:'/car', query:{id: car.id.toString()}}}><h3>{car.name}</h3></Link>
                                <h3>${car.price}.00</h3>
                                <h3>{car.description}</h3>
                                <hr></hr>
                            </div>
                        )
                })
                setState({
                    userData: data[0],
                    cart: cars
                })
            } catch(er) {console.log(er)}
        }
        getData()
    })

    return(
        <div>
            <div className='user-div'>
                <img src={state.userData.imageUrl} alt='an user icon'></img>
                <h3>{state.userData.name}</h3>
                <h3>{state.userData.address}</h3>
                <h3>{state.userData.email}</h3>
                <hr></hr>
                <h3>Cart</h3>
                {state.cart}
            </div>
        </div>
    )
}

