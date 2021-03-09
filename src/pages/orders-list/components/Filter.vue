<template>
  <v-container fluid>
    <v-row align="center" dense>
      <v-col>
        <v-autocomplete
          :items="statusOptions"
          label="Loại đơn"
          dense
          outlined
          hide-details
          single-line
          clearable
          @change="changeFilterStatus"
        >
          <template slot="item" slot-scope="{ item }">
            <span>
              <v-icon :size="12" :color="item.color" class="mr-1">
                mdi-checkbox-blank-circle
              </v-icon>
              <span>{{ item.text }}</span>
            </span>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col>
        <v-autocomplete
          :items="userOptions"
          label="User"
          dense
          outlined
          hide-details
          single-line
          clearable
          @change="changeFilterUser"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-autocomplete
          :items="siteOptions"
          :value="filterSite"
          label="Website"
          dense
          outlined
          hide-details
          single-line
          clearable
          @change="changeFilterSite"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-autocomplete
          :items="countryOptions"
          label="Loại đơn"
          dense
          outlined
          hide-details
          single-line
          clearable
          @change="changeFilterCountry"
        >
          <template slot="item" slot-scope="{ item }">
            <span>
              <v-icon :size="12" :color="item.color" class="mr-1">
                mdi-checkbox-blank-circle
              </v-icon>
              <span>{{ item.text }}</span>
            </span>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col>
        <v-select
          :items="rowOptions"
          :value="rowsPerPage"
          label="Rows"
          dense
          outlined
          hide-details
          single-line
          @change="changeRowsPerPage"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    rowOptions: [10, 20, 30, 40, 50],
    siteOptions: [],
    userOptions: [],
    statusOptions: [
      { text: "Chưa nhận", value: 0, color: "black" },
      { text: "Mới nhận", value: 1, color: "orange" },
      { text: "Cần Chuyển Khoản", value: 2, color: "red" },
      { text: "Đã Mua", value: 3, color: "green" },
      { text: "Hàng Về", value: 4, color: "blue" },
      { text: "Đã Nhận", value: 5, color: "blue darken-3" }
    ],
    countryOptions: [
      { text: "USA", value: 1, color: "green" },
      { text: "UK", value: 2, color: "blue" },
      { text: "SPAIN", value: 3, color: "orange" },
      { text: "KOREA", value: 4, color: "red" }
    ]
  }),
  async created() {
    const siteData = await this.fetchOrderCol({
      table: "orders",
      colName: "Site"
    });
    const userData = await this.fetchOrderCol({
      table: "members",
      colName: "User,id"
    });
    this.siteOptions = siteData.map(_i => _i.Site);
    this.userOptions = userData.map(_i => ({
      text: _i.User,
      value: _i.id
    }));
  },
  computed: {
    ...mapState({
      rowsPerPage: state => state.order.rowsPerPage,
      filterSite: state => state.order.filterSite
    })
  },
  methods: {
    ...mapActions("order", [
      "changeRowsPerPage",
      "changeFilterSite",
      "changeFilterUser",
      "changeFilterStatus",
      "changeFilterCountry",
      "fetchOrderCol"
    ])
  }
};
</script>

<style></style>
