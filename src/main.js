import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuesax from 'vuesax'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { sync } from 'vuex-router-sync'

import 'aos/dist/aos.css'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import store from '@/store/store'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';

Vue.config.productionTip = false
Vue.prototype.$http = axios

sync(store, router)
Vue.use(Vuesax, {
  // options here
})

new Vue({
    data: {
      site: window.location.pathname,
      currentTheme: 'customTema', 
      isParticles: false
    },

  
    methods: {
      
    },

    created() {
     
    },

    store,
    router,
    
    vuetify,
    Vuesax,
    
    render: h => h(App)
}).$mount('#app')
