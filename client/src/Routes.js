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

export default function Routes() {
    return (
        <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/cars' component={AllItems}/>
            <Route path='/drivers' component={AllUsers}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/driver/:id' children={<SingleUser />}/>
            <Route path='/car/:id' children={<SingleItem />} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/pay' component={Payment} />
            <Route path='/summary' component={OrderSummary} />
            <Route path='/login' component={Login} />
            <Route path='/search/:query' children={<Results/>} />
            <Route path='/register' component={Register} />
        </Switch>
    )
}
