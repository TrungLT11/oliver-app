<template>
  <v-container fluid>
    <v-row align="center">
      <v-badge :color="order.countryColor" overlap dot left bordered>
        <v-btn
          class="mr-1"
          small
          depressed
          color="grey darken-3"
          v-text="order.countryName"
        ></v-btn>
      </v-badge>
      <v-btn
        class="mr-1"
        small
        depressed
        color="grey darken-3"
        v-text="order.orderTime"
      ></v-btn>
      <user-dropdown :user="order.user" />
      <v-btn
        class="mr-1"
        small
        depressed
        color="grey darken-3"
        v-text="order.orderNumber"
      ></v-btn>
      <v-btn
        class="mr-1"
        small
        depressed
        color="grey darken-3"
        v-text="order.arrivalDate"
      ></v-btn>
      <v-spacer></v-spacer>
      <select
        :value="order.status"
        class="mr-3 px-3"
        style="cursor:pointer"
        @change="changeStatus($event)"
      >
        <option value="0">Hủy Đơn</option>
        <option value="1">Nhận Đơn</option>
        <option value="2">Cần Chuyển Khoản</option>
        <option value="3">Đã Mua</option>
        <option value="4">Hàng Về</option>
        <option value="5">Đã Nhận</option>
      </select>
      <debt-dropdown :order="order" />
      <v-btn
        class="mr-1"
        dark
        small
        depressed
        color="grey darken-3"
        @click="openEditDialog"
      >
        <v-icon small>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        class="mr-1"
        dark
        small
        depressed
        color="grey darken-3"
        @click="deleteOrderClick"
      >
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
      <v-simple-checkbox :ripple="false"></v-simple-checkbox>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import DebtDropdown from "./DebtDropdown.vue";
import UserDropdown from "./UserDropdown.vue";
export default {
  components: { UserDropdown, DebtDropdown },
  props: ["order"],
  methods: {
    changeStatus(event) {
      const status = event.target.value;
      const id = this.order.orderId;
      this.updateStatus({ id, status });
    },
    openEditDialog() {
      this.setEditingOrder(this.order);
      this.setEditDialog(true);
    },
    deleteOrderClick() {
      if (window.confirm("Confirm?")) this.deleteOrder(this.order.orderId);
    },
    ...mapActions("order", [
      "updateStatus",
      "deleteOrder",
      "setEditingOrder",
      "setEditDialog"
    ])
  }
};
</script>

<style></style>
