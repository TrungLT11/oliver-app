<template>
  <v-menu
    v-model="menu"
    bottom
    right
    transition="scale-transition"
    origin="top left"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-chip
        pill
        class="ma-1"
        outlined
        v-on="on"
        :color="order.cardColor"
        @click:close="$emit('remove', order.orderId)"
      >
        <v-avatar left>
          <v-img :src="order.imgLink"></v-img>
        </v-avatar>
        <span class="body-1">{{ order.brand || order.site }}</span>
      </v-chip>
    </template>
    <v-card width="300" class="ma-0 pa-0">
      <v-list :color="order.cardColor" dark>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="order.imgLink"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-truncate body-1">
              {{ order.site }} ({{ order.quantity }})
            </v-list-item-title>
            <v-list-item-subtitle class="text-truncate body-1">
              {{ order.color }} {{ order.size }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon :href="order.link" target="_blank">
              <v-icon>mdi-web</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item @click="() => {}">
          <v-list-item-action>
            <v-icon>mdi-calendar-check</v-icon>
          </v-list-item-action>
          <v-list-item-subtitle>{{ order.arrivalDate }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item v-if="order.note && order.note != 'None'">
          <v-list-item-action>
            <v-icon>mdi-note</v-icon>
          </v-list-item-action>
          <v-list-item-subtitle>{{ order.note }}</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-cash</v-icon>
          </v-list-item-action>
          <v-list-item-subtitle>{{ order.totalValue }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: ["order"],
  data: () => ({
    menu: false
  })
};
</script>

<style></style>
