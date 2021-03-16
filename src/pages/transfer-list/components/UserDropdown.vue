<template>
  <v-menu :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mr-1"
        v-bind="attrs"
        v-on="on"
        small
        depressed
        color="grey darken-3"
      >
        {{ user.username }}
        <v-icon right small>
          mdi-chevron-down
        </v-icon>
      </v-btn>
    </template>
    <v-card class="my-0" max-width="344" outlined>
      <v-card-text>
        <p class="body-2">Tên: {{user.fullname}}</p>
        <p class="body-2">Địa chỉ: {{user.address}}</p>
        <p class="body-2">SĐT: {{user.mobile}}</p>
        <p class="body-2">Email: {{user.email}}</p>
        <p class="body-2">Note: {{user.note}}</p>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: ["user"]
};
</script>

<style></style>
