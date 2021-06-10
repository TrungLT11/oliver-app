<template>
  <v-container class="pa-6" fluid v-if="currentUser.admin">
    <v-row>
      <v-col cols="12" lg="6">
        <base-material-chart-card
          :data="saleData"
          :options="lineChartOptions"
          color="green"
          hover-reveal
          type="Line"
        >
          <v-btn block color="green">
            Tiền đơn hàng 7 ngày gần đây
          </v-btn>
        </base-material-chart-card>
      </v-col>
      <v-col cols="12" lg="6">
        <base-material-chart-card
          :data="bankData"
          :options="lineChartOptions"
          color="blue"
          hover-reveal
          type="Line"
        >
          <v-btn block color="blue">
            Tiền chuyển khoản 7 ngày gần đây
          </v-btn>
        </base-material-chart-card>
      </v-col>
    </v-row>
    <v-overlay :value="fetching" opacity=".75">
      <v-progress-circular
        indeterminate
        :size="50"
        :width="5"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import millify from "millify";
import api from "@/utils/api";
export default {
  name: "Statistic",
  data() {
    return {
      lineChartOptions: {
        chartPadding: {
          top: 30
        }
      },
      saleStats: [],
      bankStats: [],
      fetching: false
    };
  },
  computed: {
    saleData() {
      return {
        series: [this.saleStats.map(s => s.sale / 1000000)],
        labels: this.saleStats.map(s =>
          millify(s.sale, {
            precision: 1
          })
        )
      };
    },
    bankData() {
      return {
        series: [this.bankStats.map(s => s.vnd / 1000000)],
        labels: this.bankStats.map(s =>
          millify(s.vnd, {
            precision: 1
          })
        )
      };
    },
    ...mapState({
      currentUser: state => state.login.currentUser
    })
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      this.fetching = true;
      try {
        await Promise.all([this.getSaleStats(7), this.getBankStats(7)]);
      } finally {
        this.fetching = false;
      }
    },
    async getSaleStats(days) {
      const response = await api.getStats({ type: "salesByDay", days });
      this.saleStats = response.reverse();
    },
    async getBankStats(days) {
      const response = await api.getStats({ type: "transfersByDay", days });
      this.bankStats = response.reverse();
    },
    ...mapActions("exchange", ["fetchExchange", "updateExchangeRate"])
  }
};
</script>
