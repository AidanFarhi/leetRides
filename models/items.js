const db = require('./db');
const {DataTypes} = require('sequelize');
    
const Items = db.define('cars', {
    name: {
        type: DataTypes.STRING,
        allowNULL: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNULL:false,
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    imageUrl:  {
        type: DataTypes.STRING(300),
        allowNULL: false,
    }
})

module.exports = Items;
