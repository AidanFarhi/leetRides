const db = require('./db');
const {DataTypes} = require('sequelize');

const Orders = db.define('orders', {
    items: {
        type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    staus: {
        type: DataTypes.ENUM('pending', 'fulfilled')
    }
})

module.exports = Orders;
