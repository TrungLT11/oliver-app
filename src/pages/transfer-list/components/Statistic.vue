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
        :smallValue="totalTransfer.toLocaleString()"
        subText="Tổng tiền hàng"
      ></base-material-stats-card>
    </v-col>
    <v-col>
      <base-material-stats-card
      color="red"
        icon="mdi-bank-transfer"
        :smallValue="totalTransfer.toLocaleString()"
        subText="Tổng Công Nợ"
      ></base-material-stats-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  async created() {},
  computed: {
    ...mapState({
      totalTransfer: state => state.transfer.totalTransfer,
      sortCol: state => state.transfer.sortCol
    })
  }
};
</script>

<style></style>
