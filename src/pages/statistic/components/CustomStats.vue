<template>
  <base-material-chart-card
    :data="chartData"
    :options="chartOptions"
    height="300"
    color="secondary"
    hover-reveal
    type="Bar"
  >
    <v-container fluid>
      <v-row>
        <v-col>
          <v-btn-toggle v-model="dateType" dark dense borderless mandatory>
            <v-btn small>
              Tùy chọn
            </v-btn>

            <v-btn small>
              1 năm gần đây
            </v-btn>

            <v-btn small>
              1 quý gần đây
            </v-btn>

            <v-btn small>
              1 tháng gần đây
            </v-btn>

            <v-btn small>
              Từ đầu năm
            </v-btn>

            <v-btn small>
              Từ đầu tháng
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :md="currentUser.admin === 1 ? 3 : 6" sm="12">
          <v-menu
            v-model="picker"
            :close-on-content-click="false"
            :disabled="pickerDisabled"
            class="pa-0"
            transition="scale-transition"
            origin="center left"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="date.join('~')"
                label="Thời gian"
                prepend-inner-icon="mdi-calendar"
                :disabled="pickerDisabled"
                readonly
                hide-details
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              range
              show-adjacent-months
              show-current
              class="ma-0"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="picker = false">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col v-if="currentUser.admin === 1">
          <v-select
            :items="indexOptions"
            v-model="index"
            label="Chỉ số"
            hide-details
          ></v-select>
        </v-col>
        <!-- <v-col>
          <v-select
            :items="durationOptions"
            v-model="duration"
            label="Thời gian"
            hide-details
          ></v-select>
        </v-col> -->
        <v-col>
          <v-select
            :items="intervalOptions"
            v-model="interval"
            label="Khoảng tính"
            hide-details
          ></v-select>
        </v-col>
        <v-col v-if="currentUser.admin === 1">
          <v-autocomplete
            :items="userOptions"
            v-model="user"
            label="User"
            hide-details
          ></v-autocomplete>
        </v-col>
        <v-col md="1" align-self="center">
          <v-btn
            v-tooltip="'Yêu cầu thống kê'"
            small
            outlined
            block
            depressed
            :loading="fetching"
            color="primary"
            @click="fetchStats"
          >
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-simple-table style="width:100%">
          <template v-slot:default>
            <thead>
              <tr>
                <th>Total</th>
                <th class="text-left" v-for="item in data" :key="item.name">
                  {{ labelFunction(item) }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="text-no-wrap">
                <td>{{ totalColumnValue }}</td>
                <td v-for="item in data" :key="item.name">
                  {{ moneyStr(item.value) }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>
    </v-container>
  </base-material-chart-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import millify from "millify";
import api from "@/utils/api";
import { sumBy } from "lodash";
const defaultRange = () => [
  moment()
    .subtract(1, "year")
    .format("YYYY-MM-DD"),
  moment().format("YYYY-MM-DD")
];
export default {
  name: "CustomStats",
  data() {
    return {
      dateType: 1,
      data: [],
      chartOptions: {
        chartPadding: {
          top: 30
        },
        plugins: [this.$chartist.plugins.tooltip()]
      },
      picker: false,
      date: defaultRange(),
      type: "Bar",
      typeOptions: ["Bar", "Line"],
      index: "ROUND(Sum((Total+ShippingCharge)*Rate/1000000),3) as value",
      indexOptions: [
        {
          text: "Tổng",
          value: "ROUND(Sum((Total+ShippingCharge)*Rate/1000000),3) as value"
        },
        {
          text: "Tổng mua vào",
          value: "ROUND(Sum((Totalin)*Rate/1000000),3) as value"
        },

        {
          text: "Tổng phí vc",
          value: "ROUND(Sum(ShippingCharge*Rate/1000000),3) as value"
        },

        {
          text: "Tổng chi phí",
          value: "ROUND(Sum((ShippingCharge+Surcharge)*Rate/1000000),3) as value"
        },
        {
          text: "Tổng công mua",
          value: "ROUND(Sum(TotalCommission*Rate/1000000),3) as value"
        }
      ],
      duration: "0, 12",
      durationOptions: [
        { text: "1 Năm", value: "0, 12" },
        { text: "1 Tháng", value: "0, 30" },
        { text: "1 Tuần", value: "0, 7" }
      ],
      interval: "YEAR(OrderDate), MONTH(OrderDate)",
      intervalOptions: [
        { text: "Năm", value: "YEAR(OrderDate)" },
        { text: "Quý", value: "YEAR(OrderDate), QUARTER(OrderDate)" },
        { text: "Tháng", value: "YEAR(OrderDate), MONTH(OrderDate)" },
        {
          text: "Ngày",
          value: "YEAR(OrderDate), MONTH(OrderDate), DAY(OrderDate)"
        }
      ],
      user: null,
      userOptions: [{ text: "Toàn bộ", value: null }],
      fetching: false
    };
  },
  computed: {
    pickerDisabled() {
      return Boolean(this.dateType);
    },
    chartData() {
      return {
        labels: this.data.map(this.labelFunction),
        series: [this.data.map(d => d.value)]
      };
    },
    totalColumnValue() {
      return this.moneyStr(sumBy(this.data, "value"));
    },
    ...mapState({
      currentUser: state => state.login.currentUser
    })
  },
  created() {
    this.initialize();
  },
  methods: {
    labelFunction(data) {
      const intervalIndex = this.intervalOptions.findIndex(
        v => v.value === this.interval
      );
      // const dayStr = moment.dayStr(Number(data.day) - 1);
      // const monthStr = moment.monthsShort(Number(data.month) - 1);
      const year = String(data.year).slice(-2);
      let result = `${data.month}/${year}`;
      switch (intervalIndex) {
        case 0:
          result = `${year}`;
          break;
        case 1:
          result = `Q${data.quarter}/${year}`;
          break;
        case 2:
          result = `T${data.month}/${year}`;
          break;
        case 3:
          result = `${data.day}/${data.month}`;
          break;
      }
      return result;
    },
    async initialize() {
      this.fetching = true;
      try {
        const userData = await this.fetchOrderCol({
          table: "members",
          colName: "user, mobile, id"
        });
        const userOptions = userData.map(_i => ({
          text: [_i.user, _i.mobile.replace(/[^\d]/g, "")]
            .filter(Boolean)
            .join(" - "),
          value: _i.id
        }));
        this.userOptions = [{ text: "Toàn bộ", value: null }, ...userOptions];
        await this.fetchStats();
      } finally {
        this.fetching = false;
      }
    },
    async fetchStats() {
      let userCondition = { UserId: this.currentUser.id };
      if (this.currentUser.admin === 1) {
        if (this.user) {
          userCondition = {
            UserId: this.user
          };
        } else {
          userCondition = {
            1: 1
          };
        }
      }
      const payload = {
        colName: [
          "YEAR(OrderDate) as year",
          "MONTH(OrderDate) as month",
          "QUARTER(OrderDate) as quarter",
          "DAY(OrderDate) as day",
          this.index
        ],
        table: "orders",
        conditions: {
          where: userCondition,
          orderBy: "OrderDate",
          desc: true,
          groupBy: this.interval
        },
        duration: this.date,
        limit: "0, 31"
      };
      this.fetching = true;
      try {
        const response = await api.getStats(payload);
        this.data = response.reverse();
      } finally {
        const self = this;
        setTimeout(function() {
          self.fetching = false;
        }, 200);
      }
    },
    moneyStr(value) {
      return millify(value * 1000000, {
        units: ["đồng", "ngàn", "triệu", "tỉ"],
        precision: 3,
        space: true
      });
    },
    ...mapActions("order", ["fetchOrderCol"])
  },
  watch: {
    dateType(val) {
      switch (val) {
        case 1:
          this.date = [
            moment()
              .subtract(1, "year")
              .format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD")
          ];
          this.interval = "YEAR(OrderDate), MONTH(OrderDate)";
          this.fetchStats();
          break;

        case 2:
          this.date = [
            moment()
              .subtract(1, "quarter")
              .format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD")
          ];
          this.interval = "YEAR(OrderDate), MONTH(OrderDate)";
          this.fetchStats();
          break;
        case 3:
          this.date = [
            moment()
              .subtract(1, "month")
              .format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD")
          ];
          this.interval = "YEAR(OrderDate), MONTH(OrderDate), DAY(OrderDate)";
          this.fetchStats();
          break;
        case 4:
          this.date = [
            moment()
              .startOf("year")
              .format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD")
          ];
          this.interval = "YEAR(OrderDate), MONTH(OrderDate)";
          this.fetchStats();
          break;
        case 5:
          this.date = [
            moment()
              .startOf("month")
              .format("YYYY-MM-DD"),
            moment().format("YYYY-MM-DD")
          ];
          this.interval = "YEAR(OrderDate), MONTH(OrderDate), DAY(OrderDate)";
          this.fetchStats();
          break;
        default:
          break;
      }
    }
  }
};
// SELECT YEAR(OrderDate) as 'year',MONTH(OrderDate) as 'month', Sum(Total*Rate) as 'value' FROM orders WHERE UserId = '1' GROUP BY YEAR(OrderDate), MONTH(OrderDate) ORDER BY YEAR(OrderDate) DESC LIMIT 0, 12
</script>
