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

        cart: [],
        search: '',
        orders: []

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
        },
        emptyCart(state, bool) {

            if (bool) {
                state.cart = []
            }

        },
        lastSearch(state, search) {
            state.search = search
        },
        removeItem(state, cartitem) {
            var index = state.cart.findIndex(c => c.id == cartitem.id);
            state.cart.splice(index, 1);
        },
        add_orders(state) {
            state.orders.push.apply(state.orders, state.cart)
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