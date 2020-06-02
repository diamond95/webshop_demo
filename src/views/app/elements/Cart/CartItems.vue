<template>
  <v-container>
    <div class="empty-space"></div>
    <v-row>
      <v-col cols="12" md="1" lg="1">
        <v-btn color="red" class="white--text" rounded @click="goBack()">
          <v-icon left>mdi-arrow-left</v-icon>Back
        </v-btn>
      </v-col>
      <v-col cols="12" md="10" lg="10">
        <v-data-table
          :headers="headers"
          :items="items"
          :item-key="'name' + 1"
          sort-by="name"
          class="elevation-1"
        >
          <template v-slot:item.photo="{ item }">
            <div class="p-2">
              <v-img :src="item.photo" :alt="item.name" width="70px"></v-img>
            </div>
          </template>
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>My Cart</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-btn color="error" @click="emptyCart()" class="mb-2">
                Empty cart
                <v-icon right>mdi-delete</v-icon>
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:no-data>
            <i>Your cart is empty. Go add some items!</i>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" md="1" lg="1">
        <v-btn color="red" class="white--text" rounded @click="goCheckout()">
          Checkout
          <v-icon right>mdi-check</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.empty-space {
  height: 100px;
}
</style>
<script>
import store from "@/store/store";
export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Photo",
        value: "photo"
      },
      {
        text: "Product Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Description", value: "description" },
      { text: "Price (HRK)", value: "price" },

      { text: "Actions", value: "actions", sortable: false }
    ],
    items: []
  }),

  computed: {},

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.items = store.state.cart;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.$store.commit("removeItem", item);
    },

    goBack() {
      this.$router.push({
        name: "Home"
      });
    },
    goCheckout() {
      let checkCart = store.state.cart;
      if (checkCart.length > 0) {
        this.$router.push({
          name: "Checkout"
        });
      }
    },
    emptyCart() {
      this.openNotification("bottom-center", "#B71C1C");
    },
    openNotification(position = null, color) {
      this.$vs.notification({
        loading: true,
        duration: 2000,
        color,
        position
      });
      setTimeout(
        () => (this.$store.commit("emptyCart", true), this.initialize()),
        2000
      );
      setTimeout(
        () =>
          this.$vs.notification({
            color,
            position,
            title: "Cart",
            text: "Your cart is empty!"
          }),
        2500
      );
    }
  }
};
</script>