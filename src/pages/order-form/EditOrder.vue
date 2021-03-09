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
        <v-btn icon dark @click="setEditDialog(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Sửa Đơn hàng</v-toolbar-title>
      </v-toolbar>
      <v-container class="ma-0 pa-3" fluid>
        <order-form @close="$emit('input', false)" :order="editingOrder" />
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import OrderForm from "./components/OrderForm";
import newOrder from "@/models/NewOrder";
export default {
  components: { OrderForm },
  computed: {
    ...mapState({
      editingOrder: state => state.order.editingOrder,
      editDialog: state => state.order.editDialog
    })
  },
  methods: {
    ...mapActions("order", ["setEditDialog", "setEditingOrder"])
  },
  watch: {
    editDialog(val) {
      if (!val) this.setEditingOrder(newOrder());
    }
  }
};
</script>
