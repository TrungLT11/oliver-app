<template>
  <v-btn color="primary" fixed bottom right dark fab @click="setCreateDialog(true)">
    <v-icon size="28">
      mdi-plus
    </v-icon>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["setCreateDialog"])
  }
};
</script>

<style></style>
