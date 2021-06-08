<template>
  <v-dialog
    :value="cloneDialog"
    fullscreen
    hide-overlay
    persistent
    eager
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="cancel">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Tạo Đơn hàng</v-toolbar-title>
      </v-toolbar>
      <v-container class="ma-0 pa-3" fluid>
        <order-form :order="cloningOrder" @submit="create" @cancel="cancel" />
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrderForm from "./components/OrderForm";
import newOrder from "@/models/NewOrder";
// import difference from "@/utils/index";
export default {
  components: { OrderForm },
  computed: {
    ...mapState({
      cloningOrder: state => state.order.cloningOrder,
      cloneDialog: state => state.order.cloneDialog
    })
  },
  methods: {
    async create({ order }) {
      await this.createOrder(order);
      this.fetchOrders();
      this.cancel();
    },
    cancel() {
      this.setCloneDialog(false);
    },
    ...mapActions("order", [
      "fetchOrders",
      "setCloneDialog",
      "setCloningOrder",
      "createOrder"
    ])
  },
  watch: {
    cloneDialog(val) {
      if (!val) this.setCloningOrder(newOrder());
    }
  }
};
</script>
