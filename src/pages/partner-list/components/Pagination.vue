<template>
  <v-container>
    <v-row justify="center">
      <v-col>
        <v-pagination
          :value="page"
          :length="totalPage"
          :total-visible="20"
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
      page: state => state.partner.page,
      rowsPerPage: state => state.partner.rowsPerPage,
      total: state => state.partner.total
    })
  },
  methods: {
    ...mapActions("partner", ["changePage"])
  }
};
</script>

<style></style>
