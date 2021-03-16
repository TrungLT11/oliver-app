<template>
  <v-btn color="primary" fixed bottom right dark fab @click="setEditDialog(true)">
    <v-icon size="28">
      mdi-plus
    </v-icon>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    selectAll(val) {
      const newSelected = val ? this.transfers.map(_o => _o.transferId) : [];
      this.setMultiSelected(newSelected);
    },
    ...mapActions("transfer", ["setEditDialog"])
  }
};
</script>

<style></style>
