const { Router }  = require('express')
// const {Cart, Users, Orders} = require('../models')
const router = new Router()
const stripe = require('stripe')(`${process.env.REACT_APP_STRIPE_API_KEY}`)

const reducer = (a, b) => a + b;
const calculateOrderAmount = items => {
    const prices = items.map(car => car.price)
    const totalCost = prices.reduce(reducer)
    console.log(totalCost)
    return totalCost
}

router.post('/', async(req, res, next) => {
    try {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "usd"
    });
    res.send({clientSecret: paymentIntent.client_secret})
    } catch(er) {next(er)}
})

module.exports = router