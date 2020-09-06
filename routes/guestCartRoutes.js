const { Router }  = require('express')
const {GuestCart, Items} = require('../models')
const { Sequelize } = require('sequelize')
const router = new Router()

// route for the car associated with a user
router.get('/:id', async(req, res, next) => {
    try {
        const response = await GuestCart.findAll({where: {guestId: req.params.id}})
        const cart = await response
        const cars = await Items.findAll({where: {id: cart[0].items}})
        res.send(cars)
    } catch(er) {next(er)}
})

// route to add item to cart
router.post('/add', async(req, res, next) => {
    try {
        const response = await GuestCart.findAll({where: {guestId: req.body.guestId}})
        const result = await response
        if (result.length > 0) {
            await GuestCart.update({
                items: Sequelize.fn('array_append', Sequelize.col('items'), req.body.itemId),
            },{where: {guestId: req.body.guestId}})
            res.send({response: 'item-added-guest'})
        } else {
            await GuestCart.create({
                items: [req.body.itemId],
                guestId: req.body.guestId
            })
            res.send({response: 'item-added-new-cart-guest'})
        }
    } catch(er) {next(er)}
})

// route to remove item from cart
router.post('/remove', async(req, res, next) => {
    try {
        const response = await GuestCart.findAll({where: {guestId: req.body.id}})
        const result = await response
        const itemArray = result[0].items
        const newArray = itemArray.filter(id => id !== req.body.itemId)
        await GuestCart.update({items: [...newArray]},{where: {guestId: req.body.id}})
        res.send({response: 'item-deleted-guest'})
    } catch(er) {next(er)}
})

module.exports = router
