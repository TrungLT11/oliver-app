<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-pagination
          :value="page"
          :length="totalPage"
          @input="changePage"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({}),
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.rowsPerPage);
    },
    ...mapState({
      page: state => state.transfer.page,
      rowsPerPage: state => state.transfer.rowsPerPage,
      total: state => state.transfer.total
    })
  },
  methods: {
    ...mapActions("transfer", ["changePage"])
  }
};
</script>

<style></style>
