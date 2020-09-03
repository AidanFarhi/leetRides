const db = require("./db");
const {DataTypes} = require("sequelize");

const Guests = db.define("guest", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
    }
})

module.exports = Guests
