<template>
  <v-container fluid>
    <v-row align="center" dense>
      <v-col>
        <v-autocomplete
          :items="userOptions"
          :value="filterUser"
          label="Tìm theo tên"
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
    <CreateUserDialog :userOptions="userOptions" />
    <EditUserDialog :userOptions="userOptions" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CreateUserDialog from "./CreateUserDialog";
import EditUserDialog from "./EditUserDialog";
export default {
  components: { CreateUserDialog, EditUserDialog },
  data: () => ({
    rowOptions: [15, 30, 45, 60, 90],
    siteOptions: [],
    userOptions: [],
    sortOptions: [
      { text: "Ngày nhập", value: "UserId" },
      { text: "Ngày chuyển", value: "UserDate" }
    ],
    statusOptions: [
      { text: "Chưa nhận", value: 0, color: "black" },
      { text: "Đã nhận", value: 1, color: "primary" }
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
      colName: "User,id"
    });
    this.userOptions = userData.map(_i => ({
      text: _i.User,
      value: _i.id
    }));
  },
  computed: {
    ...mapState({
      rowsPerPage: state => state.user.rowsPerPage,
      sortCol: state => state.user.sortCol,
      filterUser: state => state.user.filterUser
    })
  },
  methods: {
    ...mapActions("user", [
      "changeRowsPerPage",
      "changeFilterType",
      "changeFilterUser",
      "changeFilterStatus",
      "setSortCol",
      "setEditDialog"
    ]),
    ...mapActions("transfer", ["fetchTransferCol"])
  }
};
</script>

<style></style>
