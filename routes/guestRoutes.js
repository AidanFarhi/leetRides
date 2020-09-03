const { Router }  = require('express')
const {Guests} = require('../models')
const router = new Router()

//route to create Guest
router.post('/register', async(req, res, next) => {
    try {
        const newGuest = await Guests.create({
            name: 'undefined',
            address: 'undefined',
            email: 'undefined@gmail.com'
        })
        res.send({response: 'guest-created', newGuest: newGuest})
    } catch(er) {res.send(er)}
})

router.post('/update', async(req, res, next) => {
    try {
        await Guests.update({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email
        }, {where: {id: req.body.id}})
        res.send({response: 'guest-updated'})
    } catch(er) {next(er)}
})

module.exports = router
