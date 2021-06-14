<template>
  <v-speed-dial
    bottom
    right
    fixed
    direction="left"
    transition="slide-x-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn color="primary" dark fab>
        <v-icon size="28">
          mdi-checkbox-multiple-blank-circle-outline
        </v-icon>
      </v-btn>
    </template>
    <v-btn
      v-tooltip="'Bỏ chọn'"
      v-show="anySelected"
      fab
      dark
      small
      color="blue"
      @click="selectAll(false)"
    >
      <v-icon> mdi-checkbox-multiple-blank-outline</v-icon>
    </v-btn>
    <v-btn
      v-tooltip="'Chọn tất cả'"
      fab
      dark
      small
      color="blue"
      @click="selectAll(true)"
    >
      <v-icon> mdi-checkbox-multiple-marked-outline</v-icon>
    </v-btn>
    <v-btn
      v-show="anySelected"
      v-tooltip="'Tạo phiếu giao hàng'"
      fab
      dark
      small
      color="primary"
      @click="setCreateDialog(true)"
    >
      <v-icon> mdi-plus-circle</v-icon>
    </v-btn>
    <!-- <v-btn v-show="anySelected" fab dark small color="red">
      <v-icon>mdi-file-download-outline</v-icon>
    </v-btn> -->
    <v-menu top auto fixed rounded="pill" offset-y nudge-top="10">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-show="anySelected"
          v-tooltip="'Đổi trạng thái'"
          transition="slide-x-reverse-transition"
          fab
          dark
          small
          color="orange"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-pencil</v-icon>
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
            @click="changeMultiStatus(0)"
          />
          <v-btn
            fab
            dark
            x-small
            depressed
            color="orange"
            class="mx-1"
            @click="changeMultiStatus(1)"
          />
          <v-btn
            fab
            dark
            x-small
            depressed
            color="red"
            class="mx-1"
            @click="changeMultiStatus(2)"
          />
          <v-btn
            fab
            dark
            x-small
            depressed
            color="green"
            class="mx-1"
            @click="changeMultiStatus(3)"
          />
          <v-btn
            fab
            dark
            x-small
            depressed
            color="blue"
            class="mx-1"
            @click="changeMultiStatus(4)"
          />
          <v-btn
            fab
            dark
            x-small
            depressed
            color="blue darken-3"
            class="mx-1"
            @click="changeMultiStatus(5)"
          />
        </v-list-item>
      </v-list>
    </v-menu>
  </v-speed-dial>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    anySelected() {
      return Boolean(this.multiSelected.length);
    },
    ...mapState({
      orders: state => state.order.orders,
      multiSelected: state => state.order.multiSelected
    })
  },
  methods: {
    selectAll(val) {
      const newSelected = val ? this.orders.map(_o => _o.orderId) : [];
      this.setMultiSelected(newSelected);
    },
    ...mapActions("order", ["setMultiSelected", "changeMultiStatus"]),
    ...mapActions("transfer", ["setCreateDialog"])
  },
  watch: {
    orders() {
      this.setMultiSelected([]);
    }
  }
};
</script>

<style></style>
