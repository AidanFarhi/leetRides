const { Router }  = require('express')
const Users = require('../models/user')
const Orders = require('../models/orders')
const router = new Router()

// route for all users
router.get('/', async(req, res, next) => {
    try {
        const response = await Users.findAll()
        const usersData = await response
        res.send(usersData)
    } catch(er) {next(er)}
})

// route for single user
router.get('/:id', async(req, res, next) => {
    try {
        const response = await Users.findAll({where: {id: req.params.id}, iclude: Orders})
        const user = await response
        res.send(user)
    } catch(er) {next(er)}
})

module.exports = router