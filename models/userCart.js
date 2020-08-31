const db = require('./db');
const {DataTypes} = require('sequelize');

const Cart = db.define('cart', {
    items: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    }
})

module.exports = Cart;
