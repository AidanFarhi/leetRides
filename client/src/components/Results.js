import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'   
import '../cmp-styles/AllItems.css'

export default function Results() {
    const [itemDivs, setItemDivs] = useState([])
    const {query} = useParams()

    const getData = async() => {
        try {
            const response = await fetch(`find/${query}`)
            const data = await response.json()
            console.log(data)
            const divs = data.map((car, i) => {
                return (
                    <div key={i} className='car'>
                        <Link to={{pathname:'/car', query:{id: car.id.toString()}}}><img src={car.imageUrl} alt='a nice car'></img></Link>
                        <Link id='title-link'to={{pathname:'/car', query:{id: car.id.toString()}}}><h3>{car.name}</h3></Link>
                        <div className='description'>
                        <p id='price'>Starting at ${car.price}.00</p>
                        </div>
                    </div>
                )
            })
            setItemDivs(divs)
        } catch(er) {console.log(er)}
    }
    
    useEffect(()=> {
        getData()
    },[])

    return (
        <div className='cars-main-div'>
            {itemDivs}
        </div>
    )
}