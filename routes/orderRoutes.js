const { Router }  = require('express')
const {Orders, Items} = require('../models')
const { Sequelize, Op } = require('sequelize')
const router = new Router()

// route for the order associated with a user
router.get('/:id', async(req, res, next) => {
    try {
        const response = await Orders.findAll({where: {userId: req.params.id}})
        const order = await response
        const cars = await Items.findAll({where: {id: order[0].items}})
        res.send(cars)
    } catch(er) {next(er)}
})

// route to add item to order
router.post('/add', async(req, res, next) => {
    try {
        const response = await Orders.findAll({where: {userId: req.body.userId}})
        const result = await response
        console.log(result)
        if (result.length > 0) {
            await Orders.update({
                items: Sequelize.fn('array_append', Sequelize.col('items'), req.body.itemId),
                status: 'pending'
            },{where: {userId: req.body.userId}})
            res.send({response: 'item-added'})
        } else {
            await Orders.create({
                items: [req.body.itemId],
                status: 'pending',
                userId: req.body.userId
            })
            res.send({response: 'item-added-new-order'})
        }
    } catch(er) {next(er)}
})

// route to remove item from order
router.post('/remove', async(req, res, next) => {
    try {
        const response = await Orders.findAll({where: {userId: req.body.userId}})
        const result = await response
        const itemArray = result[0].items
        console.log('old array:', itemArray)
        const newArray = itemArray.filter(id => id !== req.body.itemId)
        console.log('new array:', newArray)
        await Orders.update({items: [...newArray],},{where: {userId: req.body.userId}})
        res.send({response: 'item-deleted'})
    } catch(er) {next(er)}
})

module.exports = router
