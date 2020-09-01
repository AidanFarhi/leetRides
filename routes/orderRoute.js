const { Router }  = require('express')
const {Cart, Users, Orders} = require('../models')
const router = new Router()

// make a post to orders model here
router.post('/', async(req, res, next) => {
    try {
        const response = await Cart.findAll({where: {userId: req.body.userId}, include: Users})
        const data = await response
        await Orders.create({
            name: data[0].user.name,
            address: data[0].user.address,
            email: data[0].user.email,
            items: data[0].items,
            status: 'shipping',
            total: req.body.total
        })
        await Cart.destroy({where: {userId: req.body.userId}})
        res.send({response: 'order-placed'})
    } catch(er) {next(er)}
})

module.exports = router
