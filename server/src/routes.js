/**
 * @file Server routes 
 * @module routes
 * @category server/src
 */
//const AuthController = require('./controllers/AuthController')
//const AuthControllerPolicy = require('./policies/AuthControllerPolicy')
//const CategoryController = require('./controllers/CategoryController')
//const isAuthenticated = require('./policies/isAuthenticated')
//const DataController = require('./controllers/DataController')

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
    //app.post('/register', AuthControllerPolicy.register, AuthController.register)

    
    /**
     * @description User's login
     * @method POST
     */
    //app.post('/login', AuthControllerPolicy.login, AuthController.login)


    /**
     * @description Get category names
     * @method GET
     */
    //app.get('/categoryNames', isAuthenticated, CategoryController.getCategoryNames)
    


}