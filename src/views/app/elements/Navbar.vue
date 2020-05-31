<template>
  <div>
    <v-navigation-drawer v-model="drawer" app :mini-variant="true">
      <v-list dense>
        <v-list-item link @click="goHome()">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
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

    <v-app-bar app color="indigo" dark :hide-on-scroll="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Webshop</v-toolbar-title>
      <v-spacer />

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
        <v-btn @click="cart()" color="green" dark absolute top right fab>
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
      this.$store.commit("lastSearch", '')
      this.$router.push({
        name: "Login"
      });
    },
    cart() {
      this.$router.push({
        name: "Cart"
      });
    },
    goHome() {
      this.$router.push({
        name: "Home"
      });
    }
  },
  computed: {
    CartCount() {
      return store.state.cart.length;
    }
  },
  data: () => ({
    drawer: null,
    changePasswordToggle: false
  })
};
</script>
