const db = require("./db");
const {DataTypes} = require("sequelize");

const Users = db.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        isUnique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        isUnique: true
    },
    imageUrl:{
        type: DataTypes.STRING,
        default: 'https://www.pikpng.com/pngl/m/326-3261783_person-icon-default-user-image-jpg-clipart.png',
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false,
    }
})

module.exports = Users
