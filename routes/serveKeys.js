const { Router }  = require('express')
const router = new Router()

//route to private key
router.get('/secret', async(req, res, next) => {
    res.send({key: process.env.REACT_APP_STRIPE_API_KEY})
})

// route to get public key
router.get('/public', async(req, res, next) => {
    res.send({key: process.env.REACT_APP_STRIPE_API_KEY_PUBLIC})
})

module.exports = router
