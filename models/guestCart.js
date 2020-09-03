const db = require('./db');
const {DataTypes} = require('sequelize');

const GuestCart = db.define('guestcart', {
    items: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
})

module.exports = GuestCart;
