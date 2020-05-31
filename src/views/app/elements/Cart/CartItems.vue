<template>
  <v-container>
    <div class="empty-space"></div>
    <v-row>
      <v-col cols="12" md="1" lg="1">
        <v-btn color="red" rounded @click="goBack()">Back</v-btn>
      </v-col>
      <v-col cols="12" md="10" lg="10">
        <v-data-table
          :headers="headers"
          :items="items"
          :item-key="'name' + 1"
          sort-by="calories"
          class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>My Cart</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>

              <v-btn color="error" @click="emptyCart()" class="mb-2" >Empty cart</v-btn>
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
        <v-btn color="red" rounded @click="goCheckout()">Checkout</v-btn>
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
        text: "Product Name",
        align: "start",
        sortable: false,
        value: "name"
      },
      { text: "Description", value: "description" },
      { text: "Price (HRK)", value: "price" },

      { text: "Actions", value: "actions", sortable: false }
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

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
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1);
    },

    goBack() {
      this.$router.push({
        name: "Home"
      });
    },
    goCheckout() {
      this.$router.push({
        name: "Checkout"
      });
    },
    emptyCart() {
      this.openNotification("bottom-center", "#B71C1C");
      this.$store.commit("emptyCart", true)
      this.initialize()
    },
    openNotification(position = null, color) {
      this.$vs.notification({
        color,
        position,
        title: "Cart",
        text: "Your cart is empty!"
      });
    }
  }
};
</script>