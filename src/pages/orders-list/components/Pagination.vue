<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-pagination
          :value="page"
          :length="totalPage"
          circle
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
      page: state => state.order.page,
      rowsPerPage: state => state.order.rowsPerPage,
      total: state => state.order.total
    })
  },
  methods: {
    ...mapActions("order", ["changePage"])
  }
};
</script>

<style></style>
