const { Router }  = require('express')
const Orders = require('../models/orders')
const router = new Router()

// route for the order associated with a user
router.get('/:id', async(req, res, next) => {
    try {
        const response = await Orders.findAll({where: {userId: req.params.id}})
        const order = await response
        res.send(order)
    } catch(er) {next(er)}
})

module.exports = router
