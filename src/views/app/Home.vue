<template>
  <v-app id="inspire">
    <router-view />
    <Navbar />
    <Filters></Filters>
    
  </v-app>
</template>

<script>
"use strict";

import store from "@/store/store";
import Navbar from "./elements/Navbar";
import Filters from "./elements/Home/Filters"


export default {
  name: "Home",
  components: {
    Navbar,
    Filters,
    

  },

  computed: {
   
  },

  data() {
    return {
      items: [],
      headers: {},
      dropdownNumber: [],
      welcomeNotification: false,
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
