<template>
  <v-container class="pa-3" fluid>
    <v-row>
      <v-col>
        <CustomStats/>
      </v-col>
    </v-row>
    <!-- <v-row v-if="currentUser.admin!==1">
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
    </v-row> -->
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
import moment from "moment";
import api from "@/utils/api";
import CustomStats from "./components/CustomStats";
export default {
  name: "Statistic",
  components: { CustomStats },
  data() {
    return {
      lineChartOptions: {
        chartPadding: {
          top: 30
        },
        plugins: [this.$chartist.plugins.tooltip()]
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
        labels: this.saleStats.map(s => moment(s.OrderDate).format("DD/MM"))
      };
    },
    bankData() {
      return {
        series: [this.bankStats.map(s => s.vnd / 1000000)],
        labels: this.bankStats.map(s => moment(s.TransferDate).format("DD/MM"))
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
      const response = await api.getStatsByDay({ type: "salesByDay", days });
      this.saleStats = response;
    },
    async getBankStats(days) {
      const response = await api.getStatsByDay({
        type: "transfersByDay",
        days
      });
      this.bankStats = response;
    }
  }
};
// SELECT YEAR(OrderDate) as 'year',MONTH(OrderDate) as 'month', Sum(Total*Rate) as 'value' FROM orders WHERE UserId = '1' GROUP BY YEAR(OrderDate), MONTH(OrderDate) ORDER BY YEAR(OrderDate) DESC LIMIT 0, 12
</script>
