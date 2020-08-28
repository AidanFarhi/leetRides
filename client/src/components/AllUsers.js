import React, {useState, useEffect} from 'react'

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
                            <div key={i}>
                                <img src={user.imageUrl} alt='an user icon'></img>
                                <h3>{user.name}</h3>
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
