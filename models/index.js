const db = require('./db')
const Items = require('./items')
const Users = require('./user')
const Cart = require('./userCart')
const Orders = require('./orders')

Users.hasOne(Cart, {foreignKey: 'userId'})
Cart.belongsTo(Users)
Users.hasMany(Orders, {foreignKey: 'userId'})
Orders.belongsTo(Users)

module.exports = {
    db,
    Items,
    Users,
    Cart,
    Orders
}