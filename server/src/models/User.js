/**
 * @file Users table 
 * @module User
 * @category server/src/models
*/

const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))


/**
 * @param {Object} User 
 * @description Function for hashing User password
 * @returns {String} hashed password
 */
function hashPassword (User) {
  const SALT_FACTOR = 8
  
  if (!User.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(User.password, salt, null))
    .then(hash => {
      User.setDataValue('password', hash)
    })
}


module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING(30)
        },
        surname: {
            type: DataTypes.STRING(30)
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true
        },
        password: DataTypes.STRING(70),
        auth_key: {
            type: DataTypes.STRING(255),
            unique: true
        },
        verified: DataTypes.INTEGER(4)
    },
    {
        hooks: {
          //beforeSave: hashPassword, NE RADI <- BUG NA SEQUELIZE 
          beforeCreate: hashPassword,
          beforeUpdate: hashPassword
          
         
        }
    })

  /**
   * @description Function for compare db password & entered password
   * @returns {Boolean} password (do not)matches
   */
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }
  
 

    //   User.associate = function (models) {
    //   }

  return User
}
