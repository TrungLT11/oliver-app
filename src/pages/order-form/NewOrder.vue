<template>
  <v-container class="ma-0 pa-2" fluid>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Đơn Hàng Mới</v-toolbar-title>
      </v-toolbar>
      <order-form @submit="create" />
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import OrderForm from "./components/OrderForm";
export default {
  components: { OrderForm },
  methods: {
    create({ order }) {
      this.createOrder(order);
    },
    ...mapActions("order", ["createOrder"])
  }
};
</script>
