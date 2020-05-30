/**
 * @file Mail sender 
 * @module send_mail
 * @category server/src/mailer
 */
/* eslint-disable */

const nodemailer = require("nodemailer");
const config = require('../config/config')





module.exports = {

    /**
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @param {Function} next
     * @description Function for sending email on registration form
     */
    registrationEmail(req, res, next) {


        let transporter = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: false,
            auth: {
                user: config.email.auth.user,
                pass: config.email.auth.pass
            }
        });
        let URL = config.default.backendBaseURL + "/verifyRegistration/" + req.body['auth_key']
        let ButtonStyle = "background-color: #4CAF50;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;"
        transporter.sendMail({

            from: '"Webshop Demo 👻" <Webshop@Webshop.hr>',
            to: req.body.email,
            subject: "Registracija korisnika",

            html: "<b>Pozdrav " + req.body.name + "! </b><br /><br /><br />Dobrodošao na aplikaciju Webshop Demo. <br />Za početak molimo potvrdite vašu registraciju putem klika na tipku ispod: <br /><br /><br /><a href='" + URL + "'" + " style='" + ButtonStyle + "'>Aktiviraj račun</a>"
        }, (error, result) => {

            if (error) {

                res.status(400).send({
                    error: 'Dogodila se pogreška prilikom slanja mail-a za potvrdu. Molimo pokušajte ponovno.'
                })
                return console.error(error);
            }

        });
    },


}

