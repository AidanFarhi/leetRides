const db = require('./db')
const Items = require('./items')

const Users = require('./user')
const Cart = require('./userCart')
const Orders = require('./orders')

const GuestCart = require('./guestCart')
const Guests = require('./guest')
const GuestOrders = require('./guestOrders')

// users
Users.hasOne(Cart, {foreignKey: 'userId'})
Cart.belongsTo(Users)
Users.hasMany(Orders, {foreignKey: 'userId'})
Orders.belongsTo(Users)

//guests
Guests.hasOne(GuestCart, {foreignKey: 'guestId'})
GuestCart.belongsTo(Guests)
Guests.hasMany(GuestOrders, {foreignKey: 'guestId'})

module.exports = {
    db,
    Items,
    Users,
    Cart,
    Orders,
    GuestCart,
    Guests,
    GuestOrders
}