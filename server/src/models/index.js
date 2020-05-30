const fs = require('fs')
const path = require('path')
const Sequalize = require('sequelize')
const config = require('../config/config')
/* eslint-disable */
const db = {}

const sequelize = new Sequalize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options,
    
)

fs.readdirSync(__dirname).filter((file) => file !== 'index.js').forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
})

db.sequelize = sequelize
db.Sequalize = Sequalize
module.exports = db