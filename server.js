const express = require('express')
const morgan = require('morgan')
const models = require('./models')
require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// const models = require('./models')
const PORT = 4000
const init = async() => {
    try {
        console.log('nothing to update')
    } catch(er) { console.log(er) }
    app.listen(PORT, ()=> {
        console.log(`Server live on port: ${PORT}`)
    })
}

init()

app.use('/search', require('./routes/itemRoutes'))
app.use('/items', require('./routes/itemRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/car/cart', require('./routes/cartRoutes'))
app.use('/cart', require('./routes/cartRoutes'))
app.use('/order', require('./routes/orderRoutes'))
app.use('/pay', require('./routes/paymentRoutes'))
app.use('/guestCart', require('./routes/guestCartRoutes'))
app.use('/guestOrder', require('./routes/guestOrderRoutes'))
app.use('/guest', require('./routes/guestRoutes'))

// Error catching endware
app.use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})
