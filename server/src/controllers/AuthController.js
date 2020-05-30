/**
 * @file Authentication Controller
 * @module AuthController
 * @category server/src/controllers
 */
const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const MailSender = require('../mailer/send_mail')
const crypto = require('crypto-browserify')
//const store = require('store')
//const util = require('util')




/**
 * 
 * @param {Object} user
 * @description creating JsonWebToken - Duration: 1 week
 * @returns {Object} User object with additional token prop
 */
function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    })
}

/**
 * 
 * @param {String} input Salt + email + salt
 * @description Function for hashing user email ( registration form )
 * @returns hashed token - Unique
 */
function getSHA1ofJSON (input) {
    return crypto.createHash('sha1').update(JSON.stringify(input)).digest('hex')
}


/**
 * 
 * @param {Int} min Minimum digit number
 * @param {Int} max Maximum digit number
 * @returns {Int} Random mixed number
 * @description Function for generating random number
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



module.exports = {

    /**
     * 
     * @description Function for user's registration
     * @param {Object} req 
     * @param {string} req.body.email
     * @param {string} req.body.name
     * @param {string} req.body.surname
     * @param {string} req.body.password
     * @param {Object} res
     * @param {string} res.message 
     * @returns {Object} User registration parameters 
     * @method POST
     */
    /* eslint-disable */
    async register(req, res) {
        try {
            
            let random = getRndInteger(10000, 99999)
            const auth_sha1 = "webshop" + req.body.email + random
            const auth_crypt = getSHA1ofJSON(auth_sha1)
            req.body['auth_key'] = auth_crypt
            req.body['verified'] = 0
            const userCreate = await User.create(req.body)
            const userJson = userCreate.toJSON()

            MailSender.registrationEmail(req)

            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(400).send({
                error: `Ovaj račun se već koristi.${err}`
            })
        }
        
    },


    /**
     * 
     * @description Function for user's login
     * @param {Object} req 
     * @param {string} req.body.email
     * @param {string} req.body.password
     * @param {Object} res
     * @param {string} res.message 
     * @returns {Object} User login parameters
     * @method POST
     */
    async login(req, res) {
        try {
            
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email,
                    verified: 1
                }
            })
            if(!user) {
                return res.status(403).send({
                    error: 'Uneseni email nije ispravan ili niste aktivirali svoj račun.'
                })
            }

            const isPasswordValid = await user.comparePassword(password)
            if(!isPasswordValid) {
                return res.status(403).send({
                    error: 'Uneseni podaci su neispravni!'
                })
            }
            
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(500).send({
                error: `Dogodila se neočekivana pogreška s sustavom. Molimo pokušajte ponovno.`
            })
        }
        
    },

  

}