<template>
  <v-dialog
    :value="editDialog"
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
        <v-toolbar-title>Sửa Đơn hàng</v-toolbar-title>
      </v-toolbar>
      <v-container class="ma-0 pa-3" fluid>
        <order-form :order="editingOrder" @submit="update" @cancel="cancel" />
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrderForm from "./components/OrderForm";
import newOrder from "@/models/NewOrder";
import difference from "@/utils/index";
export default {
  components: { OrderForm },
  computed: {
    ...mapState({
      editingOrder: state => state.order.editingOrder,
      editDialog: state => state.order.editDialog
    })
  },
  methods: {
    async update({ id, order }) {
      // console.log(difference(order, this.editingOrder))
      // console.log(difference(this.editingOrder,order))
      await this.updateOrder({ id, order });
      this.fetchOrders();
      this.cancel();
    },
    cancel() {
      this.setEditDialog(false);
    },
    ...mapActions("order", [
      "fetchOrders",
      "setEditDialog",
      "setEditingOrder",
      "updateOrder"
    ])
  },
  watch: {
    editDialog(val) {
      if (!val) this.setEditingOrder(newOrder());
    }
  }
};
</script>
