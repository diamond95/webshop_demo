/**
 * @file Auth Service for frontend
 * @module AuthService
 * @category src/services/
 */
import Api from '@/services/Api'

export default {

    /**
     * @description Function for register user
     * @param {Object} credentials
     * @param {String} credentials.username
     * @param {String} credentials.password
     * @param {String} credentials.name
     * @param {String} credentials.surname
     * @method POST
     */
    register (credentials) {
        return Api().post('register', credentials)
    },

    /**
     * @description Function for logging user into application
     * @param {Object} credentials
     * @param {String} credentials.username
     * @param {String} credentials.password
     * @method POST
     */
    login (credentials) {
        return Api().post('login', credentials)
    },

   
}