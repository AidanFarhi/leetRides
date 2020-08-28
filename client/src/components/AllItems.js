import React, {useState, useEffect} from 'react'
import '../cmp-styles/AllItems.css'

export default function AllItems() {
    const [state, setState] = useState({
        cars: []
    })

    useEffect(() => {
        const getData = async() => {
            try {
                const response = await fetch('/items')
                const data = await response.json()
                setState({
                    cars: data.map((car, i) => {
                        return(
                            <div key={i}>
                                <img src={car.imageUrl} alt='a nice car'></img>
                                <h3>{car.name}</h3>
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
            {state.cars}
        </div>
    )
}