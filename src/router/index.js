import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueRouter)


import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
Vue.use(VueMaterial)

const routes = [

  {
    path: '/',
    name: 'Login',
    component: Login
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/app/Home.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../views/app/Checkout.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/app/Cart.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/app/Orders.vue')
  },

  {
    path: '*',
    redirect: { name: 'Home' }
  }

]


const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
