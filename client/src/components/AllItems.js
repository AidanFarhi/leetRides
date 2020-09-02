import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../cmp-styles/AllItems.css'

export default function AllItems() {
    const [state, setState] = useState({
        cars: [],
    })

    useEffect(() => {
        const getData = async() => {
            try {
                const response = await fetch('/items')
                const data = await response.json()
                setState({
                    cars: data.map((car, i) => {
                        return(
                            <div className='car' key={i}>
                                <img src={car.imageUrl} alt='a nice car'></img>
                                <Link key={i} to={{pathname:'/car', query:{id: car.id.toString()}}}><h3>{car.name}</h3></Link>
                                <div className='description'>
                                    <p id='price'>Starting at ${car.price}.00</p>
                                    {/* <p>{car.description}</p> */}
                                </div>
                            </div>
                        )
                    })
                })
            } catch(er) {console.log(er)}
        }
        getData()
    },[])

    return (
        <div className='cars-main-div'>
            {state.cars}
        </div>
    )
}