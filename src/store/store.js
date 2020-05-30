/**
 * @file Vuex state managment pattern
 * @module Store
 * @category src/store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/**
 * @description Vuex store configuration 
 */
export default new Vuex.Store({


    strict: true,
    plugins: [createPersistedState()],
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false,
      
        cart: []

    },
    mutations: {
        setToken(state, token) {
            state.token = token
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser(state, user) {
            state.token = user
        },
  
        addToCart(state, cartitem) {

            state.cart.push(cartitem)
        }


    },
    actions: {
        setToken({ commit }, token) {
            commit('setToken', token)
        },
        setUser({ commit }, user) {
            commit('setUser', user)
        },
 


    }
})