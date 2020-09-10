// link to database goes here
const Sequelize = require('sequelize')
const uri = process.env.DATABASE_URL
const db = new Sequelize(uri,{logging: false},)

module.exports = db
