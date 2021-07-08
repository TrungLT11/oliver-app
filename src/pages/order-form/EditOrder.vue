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
import { round } from "lodash";
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
      // this.saveHistory(order);
      await this.updateOrder({ id, order });
      this.fetchOrders();
      this.cancel();
    },
    saveHistory(order) {
      const _before = this.editingOrder;
      const after = {
        ...order,
        chargeMoney: round(order.chargeMoney * order.rate, -3),
        total: round(order.total * order.rate, -3),
        totalCommission: round(order.totalCommission * order.rate, -3),
        totalin: round(order.totalin * order.rate, -3),
        shippingCharge: 0,
        debt: 0
      };
      const before = {
        ..._before,
        chargeMoney: round(_before.chargeMoney * _before.rate, -3),
        total: round(_before.total * _before.rate, -3),
        totalCommission: round(_before.totalCommission * _before.rate, -3),
        totalin: round(_before.totalin * _before.rate, -3),
        shippingCharge: 0,
        debt: 0
      };
      const difference = difference(after, before);
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
