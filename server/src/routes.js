/**
 * @file Server routes 
 * @module routes
 * @category server/src
 */
const AuthController = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
const CategoryController = require('./controllers/CategoryController')
const isAuthenticated = require('./policies/isAuthenticated')
const DataController = require('./controllers/DataController')

module.exports = (app) => {

    /**
     * @description Default route
     * @method GET
     * @returns {Object} Default message
     */
    app.get('/', (req, res) => {
        res.send({
            message: 'hello bitches'
        })
    })
   
    
    /**
     * @description User's registration
     * @method POST
     */
    app.post('/register', AuthControllerPolicy.register, AuthController.register)

    
    /**
     * @description User's login
     * @method POST
     */
    app.post('/login', AuthControllerPolicy.login, AuthController.login)


    /**
     * @description Get category names
     * @method GET
     */
    app.get('/categoryNames', isAuthenticated, CategoryController.getCategoryNames)
    

    /**
     * @description Method for verify registration email
     * @method GET
     */
    app.get('/verifyRegistration/:auth_key', AuthController.VerifyRegistration)


    /**
     * @description Method for password reset
     * @method POST
     */
    app.post('/forgot-password', AuthControllerPolicy.passwordReset, AuthController.passwordReset)


    /**
     * @description Method for check if user is able to change password
     * @method GET
     */
    app.get('/resetPassword/:auth_key', AuthController.newPassword)


    /**
     * @description Method for set new password
     * @method POST
     */
    app.post('/new-password', AuthControllerPolicy.setNewPassword, AuthController.setNewPassword)

    /**
     * @description Method for get data for dropdown
     */
    app.post('/getDropdownData', DataController.getDropdownData)



}