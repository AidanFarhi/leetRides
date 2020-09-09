const { Router }  = require('express')
const Items = require('../models/items')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const router = new Router()

// route for all items
router.get('/', async(req, res, next) => {
    try {
        const items = await Items.findAll()
        res.send(items)
    } catch(er) {next(er)}
})

// route for single item
router.get('/:id', async(req, res, next) => {
    try {
        const item = await Items.findAll({where: {id: req.params.id}})
        res.send(item)
    } catch(er) {next(er)}
})

// route for getting a range of items
router.post('/', async(req, res, next) => {
    try {
        const cars = await Items.findAll({where:{id: req.body.items}})
        res.send(cars)
    } catch(er) {next(er)}
})

// route for searching for items by name
router.get('/find/:query', async(req, res, next) => {
    try {
        const foundCars = await Items.findAll({
            where: {
                name: {
                    [Op.iLike]: req.params.query
                }
            }
        })
        res.send(foundCars)
    } catch(er) {res.send(er)}
})

module.exports = router
