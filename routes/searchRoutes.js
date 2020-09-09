const { Router }  = require('express')
const Items = require('../models/items')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const router = new Router()

// route for searching for items by name
router.get('/:query', async(req, res, next) => {
    console.log('fired back end')
    try {
        const foundCars = await Items.findAll({
            where: {
                name: {
                    [Op.iLike]: '%' + req.params.query + '%'
                }
            }
        })
        res.send(foundCars)
    } catch(er) {res.send(er)}
})

module.exports = router
