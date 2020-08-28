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
                                <Link key={i} to={{pathname:'/driver', query:{id: user.id.toString()}}}><h3>{user.name}</h3></Link>
                                <h3>{user.address}</h3>
                                <h3>{user.email}</h3>
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
            {state.users}
        </div>
    )
}
