<template>
  <v-container class="ma-0 px-2" fluid>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Đơn Hàng Mới</v-toolbar-title>
      </v-toolbar>
        <order-form @close="$emit('input', false)" />
    </v-card>
  </v-container>
</template>

<script>
import OrderForm from "./components/OrderForm";
export default {
  components: { OrderForm }
};
</script>
