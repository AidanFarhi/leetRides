const { Router }  = require('express')
const {Cart, Users, Orders, Items} = require('../models')
const router = new Router()

const reducer = (a, b) => a + b;
const calculateOrderAmount = async items => {
    try {
        const cars = await Items.findAll({where: {id: items}})
        const prices = cars.map(car => car.price)
        const totalCost = prices.reduce(reducer)
        return totalCost
    } catch(er) {console.log(er)}
}

// make a post to orders model here
router.post('/', async(req, res, next) => {
    try {
        const response = await Cart.findAll({where: {userId: req.body.userId}, include: Users})
        const data = await response
        const totalCost = await calculateOrderAmount(data[0].items)
        const order = await Orders.create({
            name: data[0].user.name,
            address: data[0].user.address,
            email: data[0].user.email,
            items: data[0].items,
            status: 'shipping',
            total: totalCost,
            userId: data[0].user.id
        })
        await Cart.destroy({where: {userId: req.body.userId}})
        res.send({response: 'order-placed', order: order})
    } catch(er) {next(er)}
})

// this will get the latest order made by a user
router.get('/recent/:id', async(req, res, next) => {
    try {
        const response = await Orders.findOne({where: {userId: req.params.id},
            order: [['createdAt', 'DESC']]
        })
        const data = await response
        res.send(data)
    } catch(er) {next(er)}
})

// gets all orders associated with an user
router.get('/:id', async(req, res, next) => {
    try {
        const response = await Orders.findAll({where:{userId: req.params.id}})
        const data = await response
        res.send(data)
    } catch(er) {next(er)}
})

module.exports = router
