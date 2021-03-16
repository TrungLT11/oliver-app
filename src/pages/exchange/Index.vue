<template>
  <v-container class="pa-6" fluid>
    <v-row align="center">
      <v-col>
        <base-material-stats-card
          color="green darken-2"
          icon="mdi-currency-usd"
          :smallValue="usRate.toLocaleString()"
        >
          <v-text-field
            class="ma-3"
            v-model="usRateInput"
            type="number"
            label="Edit"
            append-icon="mdi-check"
            @click:append.prevent="updateExchange(1, usRateInput)"
          ></v-text-field>
        </base-material-stats-card>
      </v-col>
      <v-col>
        <base-material-stats-card
          color="blue darken-2"
          icon="mdi-currency-gbp"
          :smallValue="ukRate.toLocaleString()"
        >
          <v-text-field
            class="ma-3"
            v-model="ukRateInput"
            type="number"
            label="Edit"
            append-icon="mdi-check"
            @click:append.prevent
          ></v-text-field>
        </base-material-stats-card>
      </v-col>
      <v-col>
        <base-material-stats-card
          color="orange darken-2"
          icon="mdi-currency-eur"
          :smallValue="spainRate.toLocaleString()"
        >
          <v-text-field
            class="ma-3"
            v-model="spainRateInput"
            type="number"
            label="Edit"
            append-icon="mdi-check"
            @click:append.prevent
          ></v-text-field>
        </base-material-stats-card>
      </v-col>
      <v-col>
        <base-material-stats-card
          color="red darken-2"
          icon="mdi-currency-krw"
          :smallValue="krRate.toLocaleString()"
        >
          <v-text-field
            class="ma-3"
            v-model="krRateInput"
            type="number"
            label="Edit"
            append-icon="mdi-check"
            @click:append.prevent
          ></v-text-field>
        </base-material-stats-card>
      </v-col>
    </v-row>
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
      usRateInput: 0,
      ukRateInput: 0,
      spainRateInput: 0,
      krRateInput: 0
    };
  },
  computed: {},
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
      this.usRateInput = response[0].rate;
      this.ukRateInput = response[1].rate;
      this.spainRateInput = response[2].rate;
      this.krRateInput = response[3].rate;
    },
    async updateExchange(id, rate) {
      await this.updateExchangeRate({id, rate});
      this.initialize();
    },
    ...mapActions("exchange", ["fetchExchange", "updateExchangeRate"])
  }
};
</script>
