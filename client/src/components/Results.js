import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'   
import '../cmp-styles/AllItems.css'

export default function Results() {
    const [itemDivs, setItemDivs] = useState([])
    const [loading, setLoading] = useState(true)
    const {query} = useParams()

    const getData = async() => {
        try {
            const response = await fetch(`/search/${query}`)
            const data = await response.json()
            const divs = data.map((car, i) => {
                return (
                    <div key={i} className='car'>
                        <Link to={{pathname:`/car/${car.id}`}}><img src={car.imageUrl} alt='a nice car'></img></Link>
                        <Link id='title-link'to={{pathname:`/car/${car.id}`}}><h3>{car.name}</h3></Link>
                        <div className='description'>
                        <p id='price'>Starting at ${car.price}.00</p>
                        </div>
                    </div>
                )
            })
            setLoading(false)
            setItemDivs(divs)
        } catch(er) {console.log(er)}
    }
    
    useEffect(()=> {
        console.log('fired')
        getData()
    },[])

    console.log(itemDivs)
    return (
        <div className='cars-main-div'>
            {loading ? <h2>Finding cars...</h2> : null}
            {itemDivs.length === 0 && !loading ? <h2>No Results Found</h2> : null}
            {itemDivs}
        </div>
    )
}