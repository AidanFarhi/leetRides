const { Router }  = require('express')
const {GuestCart, Guests, GuestOrders, Items} = require('../models');
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

// make a post to GuestOrders model here
router.post('/', async(req, res, next) => {
    try {
        const response = await GuestCart.findAll({where: {guestId: req.body.guestId}, include: Guests})
        const data = await response
        const totalCost = await calculateOrderAmount(data[0].items)
        console.log('line 21 of guestOrderRoutes', data[0].guest.dataValues)
        const order = await GuestOrders.create({
            name: data[0].guest.dataValues.name,
            address: data[0].guest.dataValues.address,
            email: data[0].guest.dataValues.email,
            items: data[0].dataValues.items,
            status: 'shipping',
            total: totalCost,
            guestId: data[0].guest.dataValues.id
        })
        await GuestCart.destroy({where: {guestId: req.body.guestId}})
        console.log('this is the order after it was created', order)
        res.send({response: 'order-placed', order: order})
    } catch(er) {next(er)}
})

// this will get the latest order made by a user
router.get('/recent/:id', async(req, res, next) => {
    try {
        const response = await GuestOrders.findOne({where: {guestId: req.params.id},
            order: [['createdAt', 'DESC']]
        })
        const data = await response
        res.send(data)
    } catch(er) {next(er)}
})

// gets all GuestOrders associated with an user
router.get('/:id', async(req, res, next) => {
    try {
        const response = await GuestOrders.findAll({where:{guestId: req.params.id}})
        const data = await response
        res.send(data)
    } catch(er) {next(er)}
})

module.exports = router
