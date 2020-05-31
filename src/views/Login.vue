<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar class="background-login" dark flat>
                <v-toolbar-title>Webshop demo</v-toolbar-title>
                <v-spacer />
                <v-img src="../assets/images/webshopLogo.png" class="logo"></v-img>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    v-on:keyup="error = null, success = null"
                    autocomplete="on"
                    name="email"
                    v-model="email"
                    id="email"
                    placeholder="Unesi email"
                    prepend-icon="person"
                    type="email"
                  />

                  <v-text-field
                    label="Lozinka"
                    v-on:keyup="error = null, success = null"
                    name="password"
                    autocomplete="new-password"
                    v-model="password"
                    id="password"
                    placeholder="Unesi lozinku"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-text>
                <div v-if="error === null"></div>
                <div class="alert alert-danger text-center" v-else role="alert" v-html="error" />
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <vs-button size="large" @click="login">
                  LOGIN
                  <template #animate>
                    <v-icon dark right>mdi-login</v-icon>
                  </template>
                </vs-button>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<style scoped>
.logo {
  width: 30px;
  transform: scale(1.0, 0.7);
  left: 10px;
}
.background-login {
  background: linear-gradient(to right, #006bdd, #ffffff);
}
</style>

<script>
"use strict";
import "vuetify/dist/vuetify.min.css";
//import AuthService from "@/services/AuthService";

export default {
  name: "Login",
  created() {
    this.openNotification('top-center', "#030303");
  },
  components: {},
  methods: {
    openNotification(position = null, color) {
      this.$vs.notification({
        color,
        position,
        title: "Hi",
        text: "Welcome!"
      });
    },
    /**
     * @description Function for checking the accuracy of the user's email and password, saving token & redirecting to dashboard page
     * @method POST
     */
    async login() {
      //this.$store.dispatch("CartCount", 0)
      this.$router.push({
        name: "Home"
      });
      /* try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.token);
        this.$router.push({
          name: "DHome"
        });
      } catch (error) {
        this.error = error.response.data.error;
      } */
    }
  },
  data() {
    return {
      email: "user@email.com",
      password: "useremail",
      error: null
    };
  }
};
</script>
