import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function SingleUser(props) {
    const [state, setState] = useState({
        userData: {},
        // array of <div>s
        carDivs: []
    })

    useEffect(()=> {
        const getData = async() => {
            try {
                const getUserResponse =  await fetch(`/users/${props.location.query.id}`)
                const data = await getUserResponse.json()
                const user = data[0]
                const orders = data[0].orders
                const mostRecentOrder = orders[orders.length - 1]
                const getCarsResponse = await fetch('/items', {
                    method: 'POST',
                    headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                    body: JSON.stringify({
                        items: mostRecentOrder.items
                    })
                })
                const cars = await getCarsResponse.json()
                const carDivs = cars.map((car, i) => {
                    return (
                        <div key={i}>
                            <img src={car.imageUrl}/>
                            <p>{car.name}</p>
                        </div>
                    )
                })
                setState({
                    userData: user,
                    carDivs: carDivs
                })
            } catch(er) {console.log(er)}
        }
        getData()   
    },[])

    return(
        <div>
            <div className='user-div'>
                <img src={state.userData.imageUrl} alt='an user icon'></img>
                <h3>{state.userData.name}</h3>
                <h3>{state.userData.address}</h3>
                <h3>{state.userData.email}</h3>
                <hr></hr>
                <h3>Recently Ordered</h3>
                {state.carDivs}
            </div>
        </div>
    )
}

