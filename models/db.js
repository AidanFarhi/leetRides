// link to database goes here
const Sequelize = require('sequelize')
// const uri = process.env.DATABASE_URL
// const db = new Sequelize(uri,{logging: false},)

const db = new Sequelize(
    'postgres://aidanfarhi:secret123@localhost:5432/qccshopper', 
    {logging: false},
)

module.exports = db
