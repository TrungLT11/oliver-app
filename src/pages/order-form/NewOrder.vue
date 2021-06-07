<template>
  <v-container class="ma-0 pa-2" fluid>
    <v-toolbar dark color="primary">
      <v-toolbar-title>Đơn Hàng Mới</v-toolbar-title>
    </v-toolbar>
    <order-form @submit="create" v-if="render" />
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import OrderForm from "./components/OrderForm";
export default {
  components: { OrderForm },
  data: () => ({
    render: true
  }),
  methods: {
    async create({ order }) {
      try {
        await this.createOrder(order);
        this.forceRerender();
      } catch (error) {}
    },
    forceRerender() {
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
    },
    ...mapActions("order", ["createOrder"])
  }
};
</script>
