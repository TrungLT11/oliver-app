<template>
  <v-container>
    <v-row justify="start" align="center">
      <v-col cols="1" class="pr-0">
        <v-select
          :items="rowOptions"
          :value="rowsPerPage"
          style="min-width: 90px"
          label="Rows"
          dense
          solo
          hide-details
          single-line
          @change="changeRowsPerPage"
        ></v-select>
      </v-col>
      <v-col class="pl-0">
        <v-pagination
          :value="page"
          :length="totalPage"
          :total-visible="18"
          @input="changePage"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    rowOptions: [10, 20, 30, 40, 50]
  }),
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.rowsPerPage);
    },
    ...mapState({
      page: state => state.order.page,
      rowsPerPage: state => state.order.rowsPerPage,
      total: state => state.order.total
    })
  },
  methods: {
    ...mapActions("order", ["changePage", "changeRowsPerPage"])
  }
};
</script>

<style></style>
