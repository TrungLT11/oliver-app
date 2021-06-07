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
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data: () => ({
    totalOrder: 0
  }),
  created() {
    this.getTotalCost();
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
      sortCol: state => state.transfer.sortCol,
      currentUser: state => state.login.currentUser
    }),
    ...mapGetters("transfer", ["conditionPayload"])
  },
  methods: {
    async getTotalCost() {
      const conditions = {...this.conditionPayload}
      if (!this.currentUser.admin) conditions.UserId = this.currentUser.id;
      const response = await this.fetchTransferCol({
        table: "orders",
        colName: "sum((Total+ShippingCharge)*Rate)",
        conditions
      });
      this.totalOrder = Math.round(
        response[0]["sum((Total+ShippingCharge)*Rate)"] || 0
      );
    },
    ...mapActions("transfer", ["fetchTransferCol"])
  },
  watch: {
    conditionPayload(val) {
      this.getTotalCost();
    }
  }
};
</script>

<style></style>
