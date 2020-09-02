const { Router }  = require('express')
const bcrypt = require('bcrypt')
const {Users, Orders} = require('../models')
const router = new Router()

// route to fetch all users
router.get('/', async(req, res, next) => {
    try {
        const response = await Users.findAll()
        const usersData = await response
        res.send(usersData)
    } catch(er) {next(er)}
})

// route to fetch single user
router.get('/:id', async(req, res, next) => {
    try {
        const response = await Users.findAll({where: {id: req.params.id}, include: Orders})
        const user = await response
        res.send(user)
    } catch(er) {next(er)}
})

// route to login user
router.post('/login', async(req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await Users.findAll({where: {username: username}})
        if (user.length === 0) res.send({result: 'username-not-found'})
        const check = await bcrypt.compare(password, user[0].password)
        if (check) {
            res.send({result: 'login-succesful', user: user[0]})
        } else {
            res.send({result: 'password-incorrect'})
        }
    } catch(er) {next(er)}
})

//route to create user
router.post('/register', async(req, res, next) => {
    try {
        const {name, username, imageUrl, address, email, password} = req.body
        const check  = await Users.findAll({where: {name: name}})
        if (check.length > 0) res.send({response: 'user-exists'})
        const hash = await bcrypt.hash(password, 10)
        const newUser = await Users.create({
            name: name,
            username: username,
            imageUrl: imageUrl,
            address: address,
            email: email,
            password: hash
        })
        console.log(newUser)
        res.send({response: 'user-created', newUser: newUser})
    } catch(er) {next(er)}
})

module.exports = router
