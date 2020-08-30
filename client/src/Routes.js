import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Home, AllItems, AllUsers, Cart, SingleUser, SingleItem} from './components'

export default function Routes() {
    return (
        <Switch>
            <Route path='/home' component={Home}/>
            <Route path='/cars' component={AllItems}/>
            <Route path='/drivers' component={AllUsers}/>
            <Route path='/cart' component={Cart}/>
            <Route path='/driver' component={SingleUser}/>
            <Route path='/car' component={SingleItem} />
        </Switch>
    )
}
