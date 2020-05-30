<template>
  <v-app id="inspire">
    <router-view />
    <Navbar />
    <CartItems></CartItems>
  </v-app>
</template>

<script>
"use strict";

//import store from "@/store/store";
import Navbar from "./elements/Navbar";
import CartItems from "./elements/Cart/CartItems"
export default {
  name: "Cart",
  components: {
    Navbar,
    CartItems
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
