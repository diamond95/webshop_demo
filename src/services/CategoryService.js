/**
 * @file Category Service for frontend
 * @module CategoryService
 * @category src/services/
 */
import Api from '@/services/Api'

export default {

    /**
     * @description Function for get category names (aside menu)
     * @method GET
     * @returns Array
     */
    getCategoryNames () {
        return Api().get('categoryNames')
    },
    
}