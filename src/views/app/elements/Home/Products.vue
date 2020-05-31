<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="11" md="11"></v-col>

      <v-col cols="12" lg="1" md="1">
        <!-- <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="blue-grey"
          class="ma-2 white--text"
          @click="loader = 'loading3'"
        >
          Import / Export
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>-->

        <v-btn
          :loading="loading3"
          :disabled="loading3"
          color="success"
          class="ma-2 white--text"
          @click="myCart()"
        >
          Cart
          <v-icon right dark>mdi-cart</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" lg="3" md="3"></v-col>
    </v-row>

    <v-card v-if="showSkeleton">
      <v-row>
        <v-col cols="12" md="3" lg="3" v-for="(list, index) in product_list" v-bind:key="index">
          <v-skeleton-loader
            ref="skeleton"
            type="card-avatar, article, actions"
            class="mb-6"
            max-width="344"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card>

    <v-card v-if="showProductsComp">
      <v-row>
        <v-col cols="12" md="3" lg="3" v-for="(list, index) in product_list" v-bind:key="index">
          <v-card max-width="344">
            <v-img :src="list.photo" height="250px"></v-img>

            <v-card-title>{{ list.name }}</v-card-title>

            <v-card-subtitle>
              {{ list.price }}
              <b>HRK</b>
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="green" text @click="addToCart(product_list[index])">Add to cart</v-btn>

              <v-btn color="purple" text>Explore</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon color="red">mdi-heart</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <v-row v-if="product_list.length < 1 && showProductsComp">
      <v-col cols="12" md="3" lg="3"></v-col>
      <v-col cols="12" md="6" lg="6">
        <v-alert
          text
          prominent
          type="error"
          icon="mdi-alert"
        >Ooops. Currently there is no products for this category. Try picking another one.</v-alert>
      </v-col>
      <v-col cols="12" md="3" lg="3"></v-col>
    </v-row>
.
  </v-container>
</template>

<style scoped>
.spacer {
  width: 5px;
}
</style>


<script>
//import store from "@/store/store";
export default {
  components: {},
  props: {
    showSkeleton: Boolean,
    showProductsComp: Boolean,
    product_list: Array
  },
  data() {
    return {
      search: "",
      loader: null,
      loading: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      cart: [],
      cartNotif: false
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  computed: {},
  methods: {
    /* eslint-disable */
    myCart() {
      this.$router.push({
        name: "Cart"
      });
    },
    addToCart(index) {
      this.openNotification("bottom-center", "#0bde66");
      this.$store.commit("addToCart", index);
    },
    openNotification(position = null, color) {
      this.$vs.notification({
        color,
        position,
        title: "Cart",
        text: "Item added to cart!"
      });
    }
  }
};
</script>