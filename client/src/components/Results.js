import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'   
import '../cmp-styles/AllItems.css'

export default function Results(props) {
    const [items] = useState(JSON.parse(localStorage.getItem('searchCars')) || props.location.result.items)
    const [itemDivs, setItemDivs] = useState([])

    console.log('items in results.js:', items.length)

    const makeDivs = () => {
        console.log('made new divs')
        const divs = items.map((car, i) => {
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
    }
    
    useEffect(()=> {
        if (localStorage.getItem('searchCars') === null) {  
            localStorage.setItem('searchCars', JSON.stringify(props.location.result.items))
        }
        makeDivs()
        return function cleanup() {
            localStorage.removeItem('searchCars')
        }
    },[])

    return (
        <div className='cars-main-div'>
            {itemDivs}
        </div>
    )
}