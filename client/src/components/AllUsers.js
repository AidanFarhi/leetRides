import React, {useState, useEffect} from 'react'
import '../cmp-styles/AllUsers.css'
import {Link} from 'react-router-dom'

export default function AllUsers() {

    const [state, setState] = useState({
        users: []
    })

    useEffect(() => {
        const getData = async() => {
            try {
                const response = await fetch('/users')
                const data = await response.json()
                setState({
                    users: data.map((user, i) => {
                        return(
                            <div key={i} className='user-div'>
                                <img src={user.imageUrl} alt='an user icon'></img>
                                <div className='user-data'>
                                    <Link key={i} to={{pathname:'/driver', query:{id: user.id.toString()}}}><h3>{user.username}</h3></Link>
                                    <p>{user.address}</p>
                                    <p>{user.email}</p>
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
        <div id='user-main-div'>
            <h1 id='users-header'>Drivers</h1>
            {state.users}
        </div>
    )
}
