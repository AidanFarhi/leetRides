const { Router }  = require('express')
const {Sequelize} = require('sequelize')
const Op = Sequelize.Op
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
        if (user.length === 0) res.send({result: 'Username Not Found'})
        const check = await bcrypt.compare(password, user[0].password)
        if (check) {
            res.send({result: 'login-succesful', user: user[0]})
        } else {
            res.send({result: 'Password Incorrect'})
        }
    } catch(er) {next(er)}
})

//route to create user
router.post('/register', async(req, res, next) => {
    try {
        const {name, username, imageUrl, address, email, password} = req.body
        const check = await Users.findAll({
            where: {
                [Op.or]: [
                    {name: name},
                    {username: username},
                    {address: address},
                    {email: email}
                ]
            }
        })
        if (check.length > 0) {
            if (check[0].name === name) res.send({response: 'That name is already registered'})
            if (check[0].username === username) res.send({response: 'That username is already taken'})
            if (check[0].address === address) res.send({response: 'That address is already registered'})
            if (check[0].email === email) res.send({response: 'That email is already registered'})
        } else {
            const hash = await bcrypt.hash(password, 10)
            const newUser = await Users.create({
                name: name,
                username: username,
                imageUrl: imageUrl,
                address: address,
                email: email,
                password: hash
            })
            res.send({response: 'user-created', newUser: newUser})
        }
    } catch(er) {console.log(er)}
})

module.exports = router
