<template>
  <div>
    <v-container class="pa-6" fluid>
      <Filters />
      <ActionMenu />
      <Statistic />
      <v-row>
        <v-col
          v-for="transfer in transfers"
          :key="transfer.transferId"
          cols="12"
          sm="12"
          lg="6"
        >
          <Transfer :transfer="transfer" /> </v-col
      ></v-row>
      <Pagination />
      <v-overlay :value="fetching" opacity=".75">
        <v-progress-circular
          indeterminate
          :size="50"
          :width="5"
          color="primary"
        ></v-progress-circular>
      </v-overlay>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "TransferList",
  components: {
    Transfer: () => import("./components/Transfer"),
    Filters: () => import("./components/Filter"),
    Statistic: () => import("./components/Statistic"),
    Pagination: () => import("./components/Pagination"),
    ActionMenu: () => import("./components/ActionMenu")
  },
  data() {
    return {
      // editingTransfer: null,
      // editDialog: false
    };
  },
  computed: {
    ...mapState({
      transfers: state => state.transfer.transfers,
      fetching: state => state.transfer.fetching
    })
  },
  created() {
    this.fetchTransfers();
  },
  methods: {
    ...mapActions("transfer", [
      "fetchTransfers",
      "setEditingTransfer",
      "setEditDialog"
    ])
  }
};
</script>
