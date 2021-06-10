<template>
  <v-container fluid>
    <v-row align="center" dense>
      <v-col>
        <v-autocomplete
          :items="statusOptions"
          :value="filterStatus"
          label="Trạng thái"
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
      <v-col>
        <v-autocomplete
          :items="orderOptions"
          :value="filterOrder"
          label="Loại đơn"
          dense
          outlined
          hide-details
          single-line
          clearable
          @change="changeFilterOrder"
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
      <v-col v-if="currentUser.admin">
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
        >
        </v-autocomplete>
      </v-col>
      <v-col>
        <v-autocomplete
          :items="typeOptions"
          :value="filterType"
          label="Loại"
          dense
          outlined
          hide-details
          single-line
          clearable
          @change="changeFilterType"
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
          :items="sortOptions"
          :value="sortCol"
          label="Rows"
          dense
          outlined
          hide-details
          single-line
          @change="setSortCol"
        ></v-select>
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
    <CreateDialog :userOptions="userOptions" />
    <EditDialog :userOptions="userOptions" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
export default {
  components: { CreateDialog, EditDialog },
  data: () => ({
    rowOptions: [10, 20, 40, 60, 100],
    siteOptions: [],
    userOptions: [],
    sortOptions: [
      { text: "Ngày nhập", value: "TransferId" },
      { text: "Ngày chuyển", value: "TransferDate" }
    ],
    statusOptions: [
      { text: "Chưa nhận", value: 0, color: "black" },
      { text: "Đã nhận", value: 1, color: "green" },
      { text: "Chưa chuyển khoản", value: 2, color: "red" }
    ],
    orderOptions: [
      { text: "Chưa nhận", value: 0, color: "black" },
      { text: "Mới nhận", value: 1, color: "orange" },
      { text: "Cần Chuyển Khoản", value: 2, color: "red" },
      { text: "Đã Mua", value: 3, color: "green" },
      { text: "Hàng Về", value: 4, color: "blue" },
      { text: "Đã Nhận", value: 5, color: "blue darken-3" }
    ],
    typeOptions: [
      { text: "TDCK", value: 1, color: "green" },
      { text: "COD-HN", value: 2, color: "blue" },
      { text: "COD-TINH", value: 3, color: "yellow" },
      { text: "OTHER", value: 4, color: "red" }
    ]
  }),
  async created() {
    this.setFilterFromRoute();
    const userData = await this.fetchTransferCol({
      table: "members",
      colName: "user, mobile, id"
    });
    this.userOptions = userData.map(_i => ({
      text: [_i.user, _i.mobile.replace(/[^\d]/g, "")]
        .filter(Boolean)
        .join(" - "),
      value: _i.id
    }));
  },
  watch: {
    rowsPerPage(val) {
      if (this.$route.query.rows != val)
        this.$router.push({ query: { ...this.$route.query, rows: val } });
    },
    filterType(val) {
      if (this.$route.query.type != val)
        this.$router.push({ query: { ...this.$route.query, type: val } });
    },
    filterStatus(val) {
      if (this.$route.query.status != val)
        this.$router.push({ query: { ...this.$route.query, status: val } });
    },
    filterUser(val) {
      if (this.$route.query.user != val)
        this.$router.push({ query: { ...this.$route.query, user: val } });
    },
    filterOrder(val) {
      if (this.$route.query.order != val)
        this.$router.push({ query: { ...this.$route.query, order: val } });
    },
    sortCol(val) {
      if (this.$route.query.sort != val)
        this.$router.push({ query: { ...this.$route.query, sort: val } });
    }
  },
  computed: {
    ...mapState({
      rowsPerPage: state => state.transfer.rowsPerPage,
      sortCol: state => state.transfer.sortCol,
      filterType: state => state.transfer.filterType,
      filterStatus: state => state.transfer.filterStatus,
      filterUser: state => state.transfer.filterUser,
      filterOrder: state => state.transfer.filterOrder,
      currentUser: state => state.login.currentUser
    })
  },
  methods: {
    setFilterFromRoute() {
      const { rows, type, status, user, order, sort } = this.$route.query;
      if (rows) this.changeRowsPerPage(Number(rows));
      if (type) this.changeFilterType(Number(type));
      if (status) this.changeFilterStatus(Number(status));
      if (order) this.changeFilterOrder(Number(order));
      if (user) this.changeFilterUser(Number(user));
      if (sort) this.setSortCol(sort);
    },
    ...mapActions("transfer", [
      "changeRowsPerPage",
      "changeFilterType",
      "changeFilterUser",
      "changeFilterStatus",
      "changeFilterOrder",
      "setSortCol",
      "fetchTransferCol",
      "setEditDialog"
    ])
  }
};
</script>

<style></style>
