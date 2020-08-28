import React, {useState, useEffect} from 'react'

export default function SingleUser(props) {
    const [state, setState] = useState({
        userData: {}
    })

    useEffect(()=> {
        const getData = async() => {
            try {
                const response =  await fetch(`/users/${props.location.query.id}`)
                const data = await response.json()
                setState({
                    userData: data[0]
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
            </div>
        </div>
    )
}

