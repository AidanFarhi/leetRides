const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require('./models')
const PORT = 4000
const init = async() => {
    try {
        await models.db.sync()
        console.log('all models succesfully syncronized')
    } catch(er) { console.log(er) }
    app.listen(PORT, ()=> {
        console.log(`Server live on port: ${PORT}`)
    })
}

init()

app.use('/items', require('./routes/itemRoutes'))
app.use('/users', require('./routes/userRoutes'))
// app.use('/order', require('./routes/orderRoute'))

// Error catching endware
app.use((err, req, res, next) => {
    console.error(err, typeof next)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})
