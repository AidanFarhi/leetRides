const db = require('./db')
const Items = require('./items')
const Users = require('./user')
const Cart = require('./userCart')
const Orders = require('./orders')

Users.hasOne(Cart, {foreignKey: 'userId'})

module.exports = {
    db,
    Items,
    Users,
    Cart,
    Orders
}