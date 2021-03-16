<template>
  <v-row align="center">
    <v-col>
      <base-material-stats-card
        color="blue darken-4"
        icon="mdi-bank-transfer-in"
        :smallValue="totalTransfer.toLocaleString()"
        subText="Tổng tiền chuyển khoản"
      ></base-material-stats-card>
    </v-col>
    <v-col>
      <base-material-stats-card
        color="yellow darken-4"
        icon="mdi-bank-transfer-out"
        :smallValue="totalOrder.toLocaleString()"
        subText="Tổng tiền hàng"
      ></base-material-stats-card>
    </v-col>
    <v-col>
      <base-material-stats-card
        :color="balanceColor"
        icon="mdi-bank-transfer"
        :smallValue="balance.toLocaleString()"
        subText="Tổng Công Nợ"
      ></base-material-stats-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    totalOrder: 0
  }),
  async created() {
    const response = await this.fetchOrderCol({
      table: "orders",
      colName: "sum(Total*Rate)"
    });
    this.totalOrder = Math.round(response[0]["sum(Total*Rate)"] || 0);
  },
  computed: {
    balance() {
      return this.totalTransfer - this.totalOrder;
    },
    balanceColor() {
      return this.balance > 0 ? "green" : "red";
    },
    ...mapState({
      totalTransfer: state => state.transfer.totalTransfer,
      sortCol: state => state.transfer.sortCol
    })
  },
  methods: {
    ...mapActions("order", ["fetchOrderCol"])
  }
};
</script>

<style></style>
