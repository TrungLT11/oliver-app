<template>
  <v-container class="pa-6" fluid v-if="currentUser.admin">
    <v-row align="center">
      <v-col>
        <v-card class="ma-0 text-center" color="green" dark>
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="saleStats"
                :labels="saleLabels"
                color="rgba(255, 255, 255, .7)"
                height="75"
                padding="16"
                line-width="2"
                stroke-linecap="round"
                smooth
                show-labels
              >
                <template v-slot:label="item">{{ item.value }} </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn block text>
              Tiền đơn hàng 7 ngày gần đây
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="ma-0 text-center" color="blue" dark>
          <v-card-text>
            <v-sheet color="rgba(0, 0, 0, .12)">
              <v-sparkline
                :value="bankStats"
                :labels="bankLabels"
                color="rgba(255, 255, 255, .7)"
                height="75"
                padding="16"
                line-width="2"
                stroke-linecap="round"
                smooth
              >
                <template v-slot:label="item">{{ item.value }} </template>
              </v-sparkline>
            </v-sheet>
          </v-card-text>

          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-btn block text>
              Tiền chuyển khoản 7 ngày gần đây
            </v-btn>
          </v-card-actions>
        </v-card>
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
  name: "TransferList",
  data() {
    return {
      saleStats: [],
      bankStats: [],
      fetching: false
    };
  },
  computed: {
    saleLabels() {
      return this.saleStats.map(s =>
        millify(s, {
          precision: 2
        })
      );
    },
    bankLabels() {
      return this.bankStats.map(s =>
        millify(s, {
          precision: 2
        })
      );
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
      this.saleStats = response.map(r => r.sale).reverse();
    },
    async getBankStats(days) {
      const response = await api.getStats({ type: "transfersByDay", days });
      this.bankStats = response.map(r => r.vnd).reverse();
    },
    ...mapActions("exchange", ["fetchExchange", "updateExchangeRate"])
  }
};
</script>
