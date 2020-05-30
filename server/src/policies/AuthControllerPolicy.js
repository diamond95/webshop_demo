/**
 * @file Authentication Middleware
 * @module AuthControllerPolicy
 * @category server/policies/
 */
const Joi = require('joi')

module.exports = {

    /**
     * @description Validation on form for /register page
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     * @returns error400 | next()
     */
    register (req, res, next) {
        const schema = {
            name: Joi.string(),
            surname: Joi.string(),
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-žA-Ž0-9]{8,32}$')
            ),
            auth_key: Joi.string()
        }

        const {error} = Joi.validate(req.body, schema)

        if(error) {
            switch(error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Molimo unesite email adresu.'
                    })
                    break
                case 'name':
                    res.status(400).send({
                        error: 'Molimo unesite ime.'
                    })
                    break
                case 'surname':
                    res.status(400).send({
                        error: 'Molimo unesite prezime.'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'Molimo unesite lozinku ( min. 8 znakova )'
                    })
                    break
                case 'auth_key': 
                    break
                default:
                    res.status(400).send({
                        error: 'Dogodila se pogreška s unesenim podacima. Pokušajte ponovno.'
                    })
            }
            
        } else {
            next()
        }
    },



    /**
     * @description Validation on form for /login page
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     * @returns error400 | next()
     */
    login (req, res, next) {
        const schema = {
            email: Joi.string().email(),
            password: Joi.string()
        }

        const {error} = Joi.validate(req.body, schema)

        if(error) {
            switch(error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Molimo unesite email adresu.'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: 'Molimo unesite lozinku.'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Dogodila se pogreška s unesenim podacima. Pokušajte ponovno.'
                    })
            }
            
        } else {
            next()
        }
    },


    /**
     * @description Validation on form for /forgot-password page
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     * @returns error400 | next()
     */
    passwordReset (req, res, next) {
        const schema = {
            email: Joi.string().email()
        }

        const {error} = Joi.validate(req.body, schema)

        if(error) {
            switch(error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'Molimo unesite email adresu.'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Dogodila se pogreška s unesenim podacima. Pokušajte ponovno.'
                    })
            }
            
        } else {
            next()
        }
    },


    /**
     * @description Validation on form for /new-password page
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next 
     * @returns error400 | next()
     */
    setNewPassword (req, res, next) {
        const schema = {
            password: Joi.string().required().regex(
                new RegExp('^[a-žA-Ž0-9]{8,32}$')
            ),
            confirm_password: Joi.string().required().valid(Joi.ref('password')).regex(
                new RegExp('^[a-žA-Ž0-9]{8,32}$')
            ),
        }
        
        const {error} = Joi.validate(req.body, schema)

        if(error) {
            switch(error.details[0].context.key) {
                case 'password':
                    res.status(400).send({
                        error: 'Molimo unesite novu lozinku. (min 8 znakova)'
                    })
                    break
                case 'confirm_password':
                    res.status(400).send({
                        error: 'Lozinke se ne podudaraju.'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Dogodila se pogreška s unesenim podacima. Pokušajte ponovno.'
                    })
            }
            
        } else {
            next()
        }
    }
}