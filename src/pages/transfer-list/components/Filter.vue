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
    rowOptions: [15, 30, 45, 60, 90],
    siteOptions: [],
    userOptions: [],
    sortOptions: [
      { text: "Ngày nhập", value: "TransferId" },
      { text: "Ngày chuyển", value: "TransferDate" }
    ],
    statusOptions: [
      { text: "Chưa nhận", value: 0, color: "black" },
      { text: "Đã nhận", value: 1, color: "primary" }
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
  computed: {
    ...mapState({
      rowsPerPage: state => state.transfer.rowsPerPage,
      sortCol: state => state.transfer.sortCol,
      filterType: state => state.transfer.filterType,
      filterStatus: state => state.transfer.filterStatus,
      filterCountry: state => state.transfer.filterCountry,
      filterUser: state => state.transfer.filterUser,
      filterOrder: state => state.transfer.filterOrder,
      currentUser: state => state.login.currentUser
    })
  },
  methods: {
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
