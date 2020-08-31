import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function Cart() {
    const [state, setState] = useState({
        cars: []
    })
    useEffect(()=> {
        const getData = async() => {
            try {
                const response = await fetch(`cart/${localStorage.getItem('id')}`)
                const data = await response.json()
                setState({
                    cars: data.map((car, i) => {
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
                })
            } catch(er) {console.log(er)}
        }
        getData()
    },[])

    return (
        <div>
            <h1>Your Cart</h1>
            {state.cars}
        </div>
    )
}
