<template>
  <base-material-card class="my-9" :color="order.cardColor">
    <template v-slot:heading>
      <OrderHeader :order="order" />
    </template>
    <v-card-text>
      <v-container class="pa-0" fluid>
        <v-row align="center">
          <OrderTable :order="order" />
        </v-row>
      </v-container>
    </v-card-text>
  </base-material-card>
</template>

<script>
export default {
  props: ["order"],
  components: {
    OrderTable: () => import("./OrderTable"),
    OrderHeader: () => import("./OrderHeader")
  },
  created() {},
  methods: {}
};
</script>

<style></style>
