import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

export default function SingleUser(props) {
    const [state, setState] = useState({
        userData: {},
        // array of <div>s
        orderDivs: []
    })

    useEffect(()=> {
        const getData = async() => {
            try {
                const getUserResponse =  await fetch(`/users/${props.location.query.id}`)
                const data = await getUserResponse.json()
                const user = data[0]
                const orders = data[0].orders
                const orderCarIdArrays = orders.map(ord => ord.items)
                console.log(orderCarIdArrays)
                
                // need to be able to fetch each array of ids individually from the db
                // const getCarsResponse = await fetch('/items', {
                //     method: 'POST',
                //     headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                //     body: JSON.stringify({
                //         items: itemIds
                //     })
                // })
                // const cars = await getCarsResponse.json()
                // console.log(cars)
            } catch(er) {console.log(er)}
        }
        getData()   
    },[])

    return(
        <div>
            userDiv
            {/* <div className='user-div'>
                <img src={state.userData.imageUrl} alt='an user icon'></img>
                <h3>{state.userData.name}</h3>
                <h3>{state.userData.address}</h3>
                <h3>{state.userData.email}</h3>
                <hr></hr>
                <h3>Order History</h3>
            </div> */}
        </div>
    )
}

