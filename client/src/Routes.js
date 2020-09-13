import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {
    Home, 
    AllItems, 
    AllUsers, 
    Cart, 
    SingleUser, 
    SingleItem, 
    Checkout, 
    Payment, 
    OrderSummary, 
    Login, 
    Results, 
    Register
} from './components'

export default function Routes(props) {
    // props.methods[0] === addToCart()
    // props.methods[1] === takeAwayFromCart()
    // props.methods[2] === emptyCart()
    return (
        <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/cars' component={AllItems}/>
            <Route path='/drivers' component={AllUsers}/>
            <Route path='/cart' render={()=> <Cart method={props.methods[1]}/>}/>
            <Route path='/driver/:id' children={<SingleUser />}/>
            <Route path='/car/:id' children={<SingleItem method={props.methods[0]}/>} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/pay' render={()=> <Payment method={props.methods[2]}/>} />
            <Route path='/summary' component={OrderSummary} />
            <Route path='/login' component={Login} />
            <Route path='/search/:query' children={<Results/>} />
            <Route path='/register' component={Register} />
        </Switch>
    )
}
