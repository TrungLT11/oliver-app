<template>
  <div>
    <v-toolbar dark elevation="0" color="primary" height="48">
      <v-toolbar-title>Đơn Hàng Mới</v-toolbar-title>
    </v-toolbar>
    <v-container class="ma-0 pa-2" fluid>
      <order-form
        v-if="render"
        @submit="create"
        @cancel="cancel"
        :isCreate="true"
      />
    </v-container>
  </div>
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
    cancel() {
      this.$router.push("/");
    },
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
