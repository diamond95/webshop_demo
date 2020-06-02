<template>
  <div>
    <v-navigation-drawer v-model="drawer" app :mini-variant="true" clipped>
      <v-list dense>
        <v-list-item link @click="$router.push({ name: 'Home'});">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link @click="$router.push({ name: 'Orders'});">
          <v-list-item-action>
            <v-icon>{{orders}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>My orders</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link @click="changePassword()">
          <v-list-item-action>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Change password</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" :hide-on-scroll="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-toolbar-title class="mr-5 ml-3 white--text">Webshop</v-toolbar-title>

      <v-autocomplete
        v-if="$route.path == '/home'"
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        clearable
        hide-details
        hide-selected
        item-text="name"
        item-value="price"
        label="Search..."
        solo
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Search for your favorite
              <strong>product</strong>
            </v-list-item-title>
          </v-list-item>
        </template>
       
        <template v-slot:item="{ item }">
          <v-list-item-avatar
            color="indigo"
            class="headline font-weight-light white--text"
          >{{ item.name.charAt(0) }}</v-list-item-avatar>
          <v-list-item-content style="width: 200px;">
            <v-list-item-title v-text="item.name"></v-list-item-title>
            <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>{{gamingIcon}}</v-icon>
          </v-list-item-action>
        </template>
      </v-autocomplete>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon large v-on="on" @click="logout">
            <v-icon large color="white darken-2">mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
    </v-app-bar>

    <ChangePassword v-if="changePasswordToggle"></ChangePassword>
    <v-footer color="indigo" app>
      <v-fab-transition>
        <v-btn @click="$router.push({ name: 'Cart'});" color="green" dark absolute top right fab>
          <v-icon>mdi-cart</v-icon>
          <i>{{ CartCount }}</i>
        </v-btn>
      </v-fab-transition>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </div>
</template>
<style scoped>
</style>

<script>
import { mdiYoutubeGaming, mdiCartArrowUp  } from '@mdi/js';
import store from "@/store/store";
import ChangePassword from "./Settings/ChangePassword";
export default {
  components: {
    ChangePassword
  },
  methods: {
    /* eslint-disable */
    changePassword() {
      this.changePasswordToggle = !this.changePasswordToggle;
    },
    logout() {
      this.$store.commit("lastSearch", "");
      this.$router.push({
        name: "Login"
      });
    },

  
  },
  computed: {
    CartCount() {
      return store.state.cart.length;
    }
  },
  data: () => ({
    drawer: null,
    changePasswordToggle: false,
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
    gamingIcon: mdiYoutubeGaming,
    orders: mdiCartArrowUp
  }),
  watch: {
    model(val) {
      if (val != null) this.tab = 0;
      else this.tab = null;
    },
    search(val) {

      if (this.items.length > 0) return;

      this.isLoading = true;

      // Lazily load
      // here goes your API / backend url 

 
      fetch("http://localhost:8080/webshop_demo/Search-forServer.json") // check vue.config.js file in root - CORS policy
        .then(res => res.clone().json())
        .then(res => {
          this.items = res;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false)); 
    }
  }
};
</script>
