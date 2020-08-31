const { Router }  = require('express')
const {Cart, Items} = require('../models')
const { Sequelize, Op } = require('sequelize')
const router = new Router()

// route for the order associated with a user
router.get('/:id', async(req, res, next) => {
    try {
        const response = await Cart.findAll({where: {userId: req.params.id}})
        const order = await response
        const cars = await Items.findAll({where: {id: order[0].items}})
        res.send(cars)
    } catch(er) {next(er)}
})

// route to add item to order
router.post('/add', async(req, res, next) => {
    try {
        const response = await Cart.findAll({where: {userId: req.body.userId}})
        const result = await response
        console.log(result)
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

// route to remove item from order
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
