<template>
  <v-app id="inspire">
    <router-view />
    <Navbar />
    <UserInformation></UserInformation>
    
  </v-app>
</template>

<script>
"use strict";

import store from "@/store/store";
import Navbar from "./elements/Navbar";
import UserInformation from './elements/Checkout/UserInformation'

export default {
  name: "Checkout",
  components: {
    Navbar,
    UserInformation

  },

  computed: {
   
  },

  data() {
    return {
 
    };
  },

  mounted() {
    // this.checkAuth()

  },
  methods: {
 

    /**
     * @description Function for check if user is loggedIn
     */
    checkAuth() {
      const token = store.state.token;
      if (token === null) {
        this.$router.push({
          name: "Login"
        });
      }
    }
  }
};
</script>
