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
    } catch(er) {next(er)}
})

module.exports = router
