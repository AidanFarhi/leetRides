const { Router }  = require('express')
const {Cart, Items} = require('../models')
const { Sequelize, Op } = require('sequelize')
const router = new Router()

// route for the car associated with a user
router.get('/:id', async(req, res, next) => {
    try {
        const response = await Cart.findAll({where: {userId: req.params.id}})
        const cart = await response
        const cars = await Items.findAll({where: {id: cart[0].items}})
        res.send(cars)
    } catch(er) {next(er)}
})

// route to add item to cart
router.post('/add', async(req, res, next) => {
    try {
        const response = await Cart.findAll({where: {userId: req.body.userId}})
        const result = await response
        if (result.length > 0) {
            await Cart.update({
                items: Sequelize.fn('array_append', Sequelize.col('items'), req.body.itemId),
            },{where: {userId: req.body.userId}})
            res.send({response: 'item-added'})
        } else {
            await Cart.create({
                items: [req.body.itemId],
                userId: req.body.userId
            })
            res.send({response: 'item-added-new-cart'})
        }
    } catch(er) {next(er)}
})

// route to remove item from cart
router.post('/remove', async(req, res, next) => {
    try {
        const response = await Cart.findAll({where: {userId: req.body.userId}})
        const result = await response
        const itemArray = result[0].items
        const newArray = itemArray.filter(id => id !== req.body.itemId)
        await Cart.update({items: [...newArray],},{where: {userId: req.body.userId}})
        res.send({response: 'item-deleted'})
    } catch(er) {next(er)}
})

module.exports = router
