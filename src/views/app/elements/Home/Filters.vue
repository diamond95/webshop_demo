<template>
  <v-container>
    <div class="empty_space"></div>
    <v-card>
      <v-row no-gutters>
        <v-col cols="12" lg="2" md="2" sm="6" xs="6"></v-col>
        <v-col cols="12" lg="3" md="3" sm="6" xs="6">
          <v-select
            :items="categories"
            v-model="category"
            label="Select category"
            shaped
            outlined
            dense
          ></v-select>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" lg="2" md="2" sm="6" xs="6"></v-col>
        <v-col cols="12" lg="2" md="2" sm="6" xs="6">
          <v-switch
            v-model="new_products"
            label="Show only new products"
            color="success"
            hide-details
          ></v-switch>
        </v-col>
        <v-col cols="12" lg="2" md="2" sm="6" xs="6">
          <v-switch v-model="discount" label="On discount" color="warning" hide-details></v-switch>
        </v-col>
        <v-col cols="12" lg="4" md="2" sm="6" xs="6">
          <v-btn
            :loading="loading3"
            :disabled="loading3"
            color="indigo"
            rounded
            class="ma-3 white--text pa-4"
            @click="search()"
          >
            Search
            <v-icon right dark>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <Products
      :showSkeleton="showSkeleton"
      :product_list="product_list"
      :showProductsComp="showProductsComp"
    ></Products>
  </v-container>
</template>

<style scoped>
.empty_space {
  height: 75px;
}
</style>

<script>
import store from "@/store/store";
import PC from "@/data/PC.json";
import Products from "./Products";
export default {
  components: {
    Products
  },
  data: () => ({
    PC_list: PC,
    categories: [
      "PC",
      "Laptops",
      "Smartphones",
      "Mouses, keyboards & headsets",
      "Monitors",
      "Other components"
    ],
    showSkeleton: false,
    showProductsComp: false,
    showAddPromotion: false,
    loader: null,
    loading3: false,
    loading2: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    items: [],
    modal1: null,
    modal2: null,
    overlay: false,
    discount: false,
    new_products: true,
    category: [],
    product_list: []
  }),
  created() {
    /* eslint-disable */
    console.log()
    this.lastSearch()
  },  
  methods: {
    lastSearch() {
      if(store.state.search != "") {
        this.category = store.state.search
        this.search()
      }
    },  
    search() {
      this.product_list = []
      this.loading3 = true;
      this.overlay = true;
      this.showSkeleton = true;
      this.showProductsComp = false;
      setTimeout(
        () => (
          (this.overlay = false),
          (this.showSkeleton = false),
          (this.showProductsComp = true),
          (this.showAddPromotion = true),
          (this.loading3 = false)
        ),
        2500
      );
      
      if (this.category == "PC") this.product_list = this.PC_list;
      this.$store.commit("lastSearch", this.category)
    }
  }
};
</script>