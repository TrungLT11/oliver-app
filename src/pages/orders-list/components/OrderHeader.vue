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
      <v-menu top rounded="pill" offset-y nudge-top="5">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
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
      <v-simple-checkbox
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
    selected() {
      return this.multiSelected?.includes(this.order.orderId);
    },
    ...mapState({
      multiSelected: state => state.order.multiSelected
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
      "setMultiSelected"
    ])
  }
};
</script>

<style></style>
