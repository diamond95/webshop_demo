<template>
  <v-app id="inspire">
    <router-view />
    <Navbar />
    <Filters></Filters>
    <Welcome v-if="welcomeNotification"></Welcome>
  </v-app>
</template>

<script>
"use strict";

import store from "@/store/store";
import Navbar from "./elements/Navbar";
import Filters from "./elements/Home/Filters"
import Welcome from "./elements/Settings/Welcome"

export default {
  name: "Home",
  components: {
    Navbar,
    Filters,
    Welcome

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
    this.welcome()
  },
  methods: {
 
    welcome() {
      this.welcomeNotification = true
    },
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
