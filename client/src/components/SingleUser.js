import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import '../cmp-styles/SingleUser.css'

export default function SingleUser(props) {
    const [state, setState] = useState({
        userData: {},
        // array of <div>s
        carLinks: [],
        joinDate: '',
    })

    useEffect(()=> {
        const getData = async() => {
            try {
                const getUserResponse =  await fetch(`/users/${props.location.query.id}`)
                const data = await getUserResponse.json()
                const user = data[0]
                const dateJoined = user.createdAt.slice(0, 10)
                const orders = data[0].orders
                if (orders.length > 0) {
                    const mostRecentOrder = orders[orders.length - 1]
                    const getCarsResponse = await fetch('/items', {
                        method: 'POST',
                        headers: {'Accept': 'application/json','Content-Type': 'application/json',},
                        body: JSON.stringify({
                            items: mostRecentOrder.items
                        })
                    })
                    const cars = await getCarsResponse.json()
                    console.log(cars)
                    const carLinks = cars.map((car, i) => {
                        return (
                            <Link key={i} to={{pathname:'/car', query:{id: car.id.toString()}}}><img className='car-order-image' src={car.imageUrl} alt='a nice car'></img></Link>
                        )
                    })
                    setState({
                        userData: user,
                        carLinks: carLinks,
                        joinDate: dateJoined,
                    })
                } else {
                    setState({
                        userData: user,
                        joinDate: dateJoined,
                    })
                }
            } catch(er) {console.log(er)}
        }
        getData()   
    },[])

    return(
        <div id='single-user-main-div'>
            <div className='user-div'>
                <img src={state.userData.imageUrl} alt='an user icon'></img>
                <h3>{state.userData.username}</h3>
                <p>User Joined: {state.joinDate}</p>
                <h3>Recently Ordered</h3>
            </div>
            <div id='recent-order-car-links'>
                {state.carLinks}
            </div>
        </div>
    )
}

