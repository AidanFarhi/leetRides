const express = require('express')
const path = require('path')
const morgan = require('morgan')

require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const init = async() => {
    try {
        console.log('nothing to update')
    } catch(er) { console.log(er) }
    app.listen(process.env.PORT || 4000, () => {
        console.log('app listening')
    })
}

init()

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/find', require('./routes/searchRoutes'))
app.use('/items', require('./routes/itemRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/car/cart', require('./routes/cartRoutes'))
app.use('/search/cart', require('./routes/cartRoutes'))
app.use('/cart', require('./routes/cartRoutes'))
app.use('/order', require('./routes/orderRoutes'))
app.use('/pay', require('./routes/paymentRoutes'))
app.use('/car/guestCart', require('./routes/guestCartRoutes'))
app.use('/guestCart', require('./routes/guestCartRoutes'))
app.use('/guestOrder', require('./routes/guestOrderRoutes'))
app.use('/car/guest', require('./routes/guestRoutes'))
app.use('/guest', require('./routes/guestRoutes'))
app.use('/key', require('./routes/serveKeys'))
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Error catching endware
app.use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})
