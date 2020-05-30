/* eslint-disable */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
var serveStatic = require('serve-static')

app.use(serveStatic(__dirname + "/dist"))
var port = process.env.PORT || 8080;
var hostname = '0.0.0.0';
require('./passport')
require('./routes')(app)


app.listen(port, hostname, () => {
    console.log(`Server je zapoceo na: http://${hostname}:${port}/`);
    console.log(__dirname);
});
