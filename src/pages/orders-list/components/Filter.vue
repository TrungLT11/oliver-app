<template>
  <v-container fluid>
    <v-row align="center" dense>
      <v-col>
        <v-autocomplete
          :items="statusOptions"
          :value="filterStatus"
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
                mdi-checkbox-blank
              </v-icon>
              <span>{{ item.text }}</span>
            </span>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col v-if="this.currentUser.admin">
        <v-autocomplete
          :items="userOptions"
          :value="filterUser"
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
          :value="filterCountry"
          label="Nước"
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
    <CreateDialog :userOptions="userOptions" :isOrder="true" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CreateDialog from "@/pages/transfer-list/components/CreateDialog";
export default {
  components: { CreateDialog },
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
    this.setFilterFromRoute();
    const siteData = await this.fetchOrderCol({
      table: "orders",
      colName: "site"
    });
    const userData = await this.fetchOrderCol({
      table: "members",
      colName: "user, mobile, id"
    });
    this.siteOptions = siteData.map(_i => _i.site || "blank");
    this.userOptions = userData.map(_i => ({
      text: [_i.user, _i.mobile.replace(/[^\d]/g, "")]
        .filter(Boolean)
        .join(" - "),
      value: _i.id
    }));
  },
  computed: {
    ...mapState({
      rowsPerPage: state => state.order.rowsPerPage,
      filterSite: state => state.order.filterSite,
      filterStatus: state => state.order.filterStatus,
      filterCountry: state => state.order.filterCountry,
      filterUser: state => state.order.filterUser,
      currentUser: state => state.login.currentUser
    })
  },
  watch: {
    rowsPerPage(val) {
      if (this.$route.query.rows != val)
        this.$router.push({ query: { ...this.$route.query, rows: val } });
    },
    filterSite(val) {
      if (this.$route.query.site != val)
        this.$router.push({ query: { ...this.$route.query, site: val } });
    },
    filterStatus(val) {
      if (this.$route.query.status != val)
        this.$router.push({ query: { ...this.$route.query, status: val } });
    },
    filterCountry(val) {
      if (this.$route.query.country != val)
        this.$router.push({ query: { ...this.$route.query, country: val } });
    },
    filterUser(val) {
      if (this.$route.query.user != val)
        this.$router.push({ query: { ...this.$route.query, user: val } });
    }
  },
  methods: {
    setFilterFromRoute() {
      const { rows, site, status, country, user } = this.$route.query;
      if (rows) this.changeRowsPerPage(Number(rows));
      if (site) this.changeFilterSite(site);
      if (status) this.changeFilterStatus(Number(status));
      if (country) this.changeFilterCountry(Number(country));
      if (user) this.changeFilterUser(Number(user));
    },
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
