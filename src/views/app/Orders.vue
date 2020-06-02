<template>
  <v-app id="inspire">
    <router-view />
    <Navbar />
    <Orders></Orders>
  </v-app>
</template>

<script>
"use strict";

//import store from "@/store/store";
import Navbar from "./elements/Navbar";
import Orders from "./elements/Orders/MyOrders"
export default {
  name: "Cart",
  components: {
    Navbar,
    Orders
  },

  computed: {},

  data() {
    return {
      items: [],
      headers: {},
 
    };
  },

  mounted() {
  
  },
  methods: {
   
  }
};
</script>
