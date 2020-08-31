const { Router }  = require('express')
// const Orders = require('../models/orders')
const router = new Router()

// make a post to orders model here
router.get('/', async(req, res, next) => {
    try {
        console.log('hit orders')
    } catch(er) {next(er)}
})

module.exports = router
