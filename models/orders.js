const db = require('./db');
const {DataTypes} = require('sequelize');
    
const Orders = db.define('orders', {
    name: {
        type: DataTypes.STRING,
        allowNULL: false,
    },
    address: {
        type: DataTypes.STRING(300),
        allowNULL: false
    },
    email: {
        type: DataTypes.STRING(300),
        allowNULL: false,
        validate:{
            isEmail: true
        }
    },
    items: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNULL: false
    },
    status: {
        type: DataTypes.ENUM('shipping', 'delivered')
    },
    total: {
        type: DataTypes.INTEGER
    }
})

module.exports = Orders;
