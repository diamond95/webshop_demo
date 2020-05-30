<template>
  <v-app id="inspire">
    <router-view />
    <Navbar />
    
    
  </v-app>
</template>

<script>
"use strict";

import store from "@/store/store";
import Navbar from "./elements/Navbar";


export default {
  name: "Mechanic",
  components: {
    Navbar,

  },

  computed: {
   
  },

  data() {
    return {
      items: [],
      headers: {},
      dropdownNumber: []
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
