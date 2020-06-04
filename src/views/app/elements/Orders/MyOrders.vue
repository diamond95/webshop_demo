<template>
  <v-container>
    <div class="empty-space"></div>
    <v-row>
      <v-col cols="12" md="1" lg="1"></v-col>
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
              <v-toolbar-title>My orders</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>

          <template v-slot:no-data>
            <i>Hmm, you don't have any orders jet. Go buy something!</i>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" md="1" lg="1"></v-col>
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

      
    ],
    items: []
  }),

  computed: {
   
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {

      this.items = store.state.orders;
    }
  }
};
</script>