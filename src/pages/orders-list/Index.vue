<template>
  <div>
    <v-container fluid>
      <Filters />
      <ActionMenu v-if="currentUser.admin" />
      <div v-for="order in orders" :key="order.orderId">
        <Order :order="order" />
      </div>
      <Pagination />
      <EditOrderDialog />
      <CloneOrderDialog />
      <v-overlay :value="fetching" opacity=".75">
        <v-progress-circular
          indeterminate
          :size="50"
          :width="5"
          color="primary"
        ></v-progress-circular>
      </v-overlay>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "OrderList",
  components: {
    Order: () => import("./components/Order"),
    Filters: () => import("./components/Filter"),
    Pagination: () => import("./components/Pagination"),
    ActionMenu: () => import("./components/ActionMenu"),
    EditOrderDialog: () => import("@/pages/order-form/EditOrder"),
    CloneOrderDialog: () => import("@/pages/order-form/CloneOrder")
  },
  data() {
    return {
      // editingOrder: null,
      // editDialog: false
    };
  },
  computed: {
    ...mapState({
      orders: state => state.order.orders,
      fetching: state => state.order.fetching,
      currentUser: state => state.login.currentUser
    })
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    ...mapActions("order", [
      "fetchOrders",
      "setEditingOrder",
      "setEditDialog",
      "setCloningOrder",
      "setCloneDialog"
    ])
  }
};
</script>
