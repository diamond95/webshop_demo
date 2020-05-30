import axios from 'axios'
import store from '@/store/store'
export default () => {

    return axios.create({
        baseURL: `https://dev.company.local`,
        headers: {
            Authorization: `Bearer ${store.state.token}`
        }
    })
}
