<template>
  <v-menu :close-on-content-click="false" offset-y left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        class="mr-1"
        dark
        small
        depressed
        color="grey darken-3"
      >
        <v-icon small>mdi-eye</v-icon>
      </v-btn>
    </template>
    <v-card class="my-0" max-width="344" outlined>
      <v-card-text>
        <p class="body-2">Đã Chuyển: {{ order.transfered }}</p>
        <p class="body-2">Còn Nợ: {{ order.debt }}</p>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: ["order"]
};
</script>

<style></style>
