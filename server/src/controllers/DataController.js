/**
 * @file Data Controller
 * @module DataController
 * @category server/src/controllers
 */


/* eslint-disable */
var db = require('../models/index')
const single_quote = "\'"

module.exports = {


  /**
   * 
   * @param {Array} req Selected data
   * @param {Array} res Values for fill dropdown
   * @description Function for get values for selected dropdown - hierarchy  
   */
  async getDropdownData(req, res) {
    try {

      const selectedDropdown = single_quote + req.body.selectedDropdown + single_quote
      const existingValues = single_quote + JSON.stringify(req.body.existingValues) + single_quote
      db.sequelize.query('call get_dropdown_values(' + selectedDropdown + ', ' + existingValues + ' )').then(data => {

        res.send(data)
      })

    } catch (err) {
      res.status(500).send({
        error: "Dogodila se pogreška prilikom dohvaćanja vrijednosti za tu opciju."
      })
    }
  },



}