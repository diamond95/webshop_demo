/**
 * @file Data Service for frontend
 * @module DataService
 * @category src/services/
 */
import Api from '@/services/Api'

export default {


    /**
     * @description Function for get data for dropdown
     * @method POST
     * @returns Array
     */
    getDropdownData(data) {
        return Api().post('getDropdownData', data)
    },



    
}