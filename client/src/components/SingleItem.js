import React, {useState, useEffect} from 'react'

export default function SingleItem(props) {
    const [state, setState] = useState({
        carData: {}
    })

    useEffect(()=> {
        const getData = async() => {
            try {
                const response =  await fetch(`/items/${props.location.query.id}`)
                const data = await response.json()
                setState({
                    carData: data[0]
                })
            } catch(er) {console.log(er)}
        }
        getData()
    },[])

    return(
        <div>
            <div className='car-div'>
                <img src={state.carData.imageUrl} alt='a sweet ride'></img>
                <h3>{state.carData.name}</h3>
                <h3>{state.carData.price}</h3>
                <h3>{state.carData.description}</h3>
                <hr></hr>
            </div>
        </div>
    )
}

