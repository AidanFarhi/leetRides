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

const validateEmail = (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(email.toString().toLowerCase())
}
// route to login user
router.post('/login', async(req, res, next) => {
    const {username, password} = req.body
    if (validateEmail(username)) {
        try {
            const user = await Users.findAll({where: {email: username}})
            if (user.length === 0) res.send({result: 'Username Not Found'})
            const check = await bcrypt.compare(password, user[0].password)
            if (check) {
                res.send({result: 'login-succesful', user: user[0]})
            } else {
                res.send({result: 'Password Incorrect'})
            }
        } catch(er) {next(er)}
    } else {
        try {
            const user = await Users.findAll({where: {username: username}})
            if (user.length === 0) res.send({result: 'Username Not Found'})
            const check = await bcrypt.compare(password, user[0].password)
            if (check) {
                res.send({result: 'login-succesful', user: user[0]})
            } else {
                res.send({result: 'Password Incorrect'})
            }
        } catch(er) {next(er)}
    }
})

const urlCheck = (url) => {
    const reg = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    return reg.test(url)
}
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
            let finalUrl = ''
            if (urlCheck(imageUrl)) {
                finalUrl = imageUrl
            } else {
                finalUrl = 'https://freesvg.org/img/abstract-user-flat-4.png'
            }
            const hash = await bcrypt.hash(password, 10)
            const newUser = await Users.create({
                name: name,
                username: username,
                imageUrl: finalUrl,
                address: address,
                email: email,
                password: hash
            })
            res.send({response: 'user-created', newUser: newUser})
        }
    } catch(er) {console.log(er)}
})

module.exports = router
