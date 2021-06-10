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
      <debt-dropdown :order="order" />
      <v-menu top rounded="pill" offset-y nudge-top="5">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="canMod"
            v-tooltip="'Trạng thái'"
            class="mr-1"
            small
            depressed
            color="grey darken-3"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-circle-half-full</v-icon>
          </v-btn>
        </template>
        <v-list outlined rounded>
          <v-list-item>
            <v-btn
              fab
              dark
              x-small
              depressed
              color="black"
              class="mx-1"
              @click="changeStatus(0)"
            />
            <v-btn
              fab
              dark
              x-small
              depressed
              color="orange"
              class="mx-1"
              @click="changeStatus(1)"
            />
            <v-btn
              fab
              dark
              x-small
              depressed
              color="red"
              class="mx-1"
              @click="changeStatus(2)"
            />
            <v-btn
              fab
              dark
              x-small
              depressed
              color="green"
              class="mx-1"
              @click="changeStatus(3)"
            />
            <v-btn
              fab
              dark
              x-small
              depressed
              color="blue"
              class="mx-1"
              @click="changeStatus(4)"
            />
            <v-btn
              fab
              dark
              x-small
              depressed
              color="blue darken-3"
              class="mx-1"
              @click="changeStatus(5)"
            />
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-if="canEditForUser"
        v-tooltip="'Sửa'"
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
        v-if="canEditForUser"
        v-tooltip="'Clone'"
        class="mr-1"
        dark
        small
        depressed
        color="grey darken-3"
        @click="openCloneDialog"
      >
        <v-icon small>mdi-content-copy</v-icon>
      </v-btn>
      <v-btn
        v-if="canDelete || !order.status"
        v-tooltip="'Xóa'"
        class="mr-1"
        dark
        small
        depressed
        color="grey darken-3"
        @click="deleteOrderClick"
      >
        <v-icon small>mdi-delete</v-icon>
      </v-btn>
      <v-simple-checkbox
        v-if="canMod"
        :ripple="false"
        :value="selected"
        @click="selectMultiple"
      ></v-simple-checkbox>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DebtDropdown from "./DebtDropdown.vue";
import UserDropdown from "./UserDropdown.vue";
export default {
  components: { UserDropdown, DebtDropdown },
  props: ["order"],
  computed: {
    canDelete() {
      return this.user.admin === 1;
    },
    canMod() {
      return this.user.admin != 0;
    },
    canEditForUser() {
      return this.order.status < 4 || this.user.admin;
    },
    selected() {
      return this.multiSelected?.includes(this.order.orderId);
    },
    ...mapState({
      multiSelected: state => state.order.multiSelected,
      user: state => state.login.currentUser
    })
  },
  methods: {
    changeStatus(status) {
      const id = this.order.orderId;
      this.updateStatus({ id, status });
    },
    openEditDialog() {
      this.setEditingOrder(this.order);
      this.setEditDialog(true);
    },
    openCloneDialog() {
      this.setCloningOrder(this.order);
      this.setCloneDialog(true);
    },
    deleteOrderClick() {
      if (window.confirm("Confirm?")) this.deleteOrder(this.order.orderId);
    },
    selectMultiple() {
      const orderId = this.order.orderId;
      const newSelected = this.selected
        ? this.multiSelected.filter(_s => _s != orderId)
        : [...this.multiSelected, orderId];
      this.setMultiSelected(newSelected);
    },
    ...mapActions("order", [
      "updateStatus",
      "deleteOrder",
      "setEditingOrder",
      "setEditDialog",
      "setCloningOrder",
      "setCloneDialog",
      "setMultiSelected"
    ])
  }
};
</script>

<style></style>
