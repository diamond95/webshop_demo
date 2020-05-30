/**
 * @file Category Controller
 * @module CategoryController
 * @category server/src/controllers
 */

const {Categories} = require('../models')


module.exports = {

    async getCategoryNames (req, res) {
        try {
         
          const cat = await Categories.findAll({
            attributes: ['id', 'name', 'icon']
          })
          
          res.send(cat)
        } catch (err) {
          res.status(500).send({
            error: 'an error has occured trying to fetch the categories'
          })
        }
    },



}