<template>
  <v-container class="pa-6" fluid>
    <v-row align="center">
      <v-col sm="12" md="4">
        <base-material-stats-card
          color="green darken-2"
          icon="mdi-currency-usd"
          :smallValue="usRate.toLocaleString() + ' ₫'"
        >
          <v-row align="center" class="ma-0 pa-0">
            <v-text-field
              v-if="currentUser.admin"
              v-model="usRateInput"
              type="number"
              label="Sửa"
            ></v-text-field>
            <v-btn
              small
              outlined
              tile
              color="primary"
              @click.prevent="updateExchange(1, usRateInput)"
            >
              Cập nhật
            </v-btn>
          </v-row>
        </base-material-stats-card>
      </v-col>
      <v-col sm="12" md="4">
        <base-material-stats-card
          color="blue darken-2"
          icon="mdi-currency-gbp"
          :smallValue="ukRate.toLocaleString() + ' ₫'"
        >
          <v-row align="center" class="ma-0 pa-0">
            <v-text-field
              v-if="currentUser.admin"
              v-model="ukRateInput"
              type="number"
              label="Sửa"
            ></v-text-field>
            <v-btn
              small
              outlined
              tile
              color="primary"
              @click.prevent="updateExchange(2, ukRateInput)"
            >
              Cập nhật
            </v-btn>
          </v-row>
        </base-material-stats-card>
      </v-col>
      <v-col sm="12" md="4">
        <base-material-stats-card
          color="orange darken-2"
          icon="mdi-currency-eur"
          :smallValue="spainRate.toLocaleString() + ' ₫'"
        >
          <v-row align="center" class="ma-0 pa-0">
            <v-text-field
              v-if="currentUser.admin"
              v-model="spainRateInput"
              type="number"
              label="Sửa"
            ></v-text-field>
            <v-btn
              small
              outlined
              tile
              color="primary"
              @click.prevent="updateExchange(3, spainRateInput)"
            >
              Cập nhật
            </v-btn>
          </v-row>
        </base-material-stats-card>
      </v-col>
      <v-col sm="12" md="4">
        <base-material-stats-card
          color="red darken-2"
          icon="mdi-currency-krw"
          :smallValue="krRate.toLocaleString() + ' ₫'"
        >
          <v-row align="center" class="ma-0 pa-0">
            <v-text-field
              v-if="currentUser.admin"
              v-model="krRateInput"
              type="number"
              label="Sửa"
            ></v-text-field>
            <v-btn
              small
              outlined
              tile
              color="primary"
              @click.prevent="updateExchange(4, krRateInput)"
            >
              Cập nhật
            </v-btn>
          </v-row>
        </base-material-stats-card>
      </v-col>
      <v-col sm="12" md="4">
        <base-material-stats-card
          color="purple darken-2"
          icon="mdi-currency-php"
          :smallValue="plRate.toLocaleString() + ' ₫'"
        >
          <v-row align="center" class="ma-0 pa-0">
            <v-text-field
              v-if="currentUser.admin"
              v-model="plRateInput"
              type="number"
              label="Sửa"
            ></v-text-field>
            <v-btn
              small
              outlined
              tile
              color="primary"
              @click.prevent="updateExchange(5, plRateInput)"
            >
              Cập nhật
            </v-btn>
          </v-row>
        </base-material-stats-card>
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
export default {
  name: "TransferList",
  data() {
    return {
      usRate: 0,
      ukRate: 0,
      spainRate: 0,
      krRate: 0,
      plRate: 0,
      usRateInput: 0,
      ukRateInput: 0,
      spainRateInput: 0,
      krRateInput: 0,
      plRateInput: 0
    };
  },
  computed: {
    ...mapState({
      fetching: state => state.exchange.fetching,
      currentUser: state => state.login.currentUser
    })
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      const response = await this.fetchExchange();
      this.usRate = response[0].rate;
      this.ukRate = response[1].rate;
      this.spainRate = response[2].rate;
      this.krRate = response[3].rate;
      this.plRate = response[4].rate;
      this.usRateInput = response[0].rate;
      this.ukRateInput = response[1].rate;
      this.spainRateInput = response[2].rate;
      this.krRateInput = response[3].rate;
      this.plRateInput = response[4].rate;
    },
    async updateExchange(id, rate) {
      await this.updateExchangeRate({ id, rate });
      this.initialize();
    },
    ...mapActions("exchange", ["fetchExchange", "updateExchangeRate"])
  }
};
</script>
