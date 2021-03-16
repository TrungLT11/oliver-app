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
        >
        </v-autocomplete>
      </v-col>
      <v-col>
        <v-autocomplete
          :items="typeOptions"
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
    <TransferDialog :userOptions="userOptions" />
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TransferDialog from "./TransferDialog";
export default {
  components: { TransferDialog },
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
      rowsPerPage: state => state.transfer.rowsPerPage,
      sortCol: state => state.transfer.sortCol
    })
  },
  methods: {
    ...mapActions("transfer", [
      "changeRowsPerPage",
      "changeFilterType",
      "changeFilterUser",
      "changeFilterStatus",
      "setSortCol",
      "fetchTransferCol",
      "setEditDialog"
    ])
  }
};
</script>

<style></style>
