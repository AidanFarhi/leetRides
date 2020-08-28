const db = require("./db");
const {DataTypes} = require("sequelize");

const Users = db.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageUrl:{
        type: DataTypes.STRING,
        default: 'https://www.pikpng.com/pngl/m/326-3261783_person-icon-default-user-image-jpg-clipart.png',
        validate:{
            isUrl: true
        }
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
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Users
