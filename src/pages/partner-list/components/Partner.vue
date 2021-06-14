<template>
  <v-sheet elevation="2" rounded="b-lg t-xl">
    <v-sheet
      class="pa-3"
      elevation="2"
      color="primary"
      dark
      rounded="xl"
    >
      <v-row align="center">
        <v-btn icon>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <span class="text-h4" v-text="partner.name"></span>
        <v-spacer></v-spacer>
        <v-btn icon @click="editPartner">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-if="canDelete" icon @click="deletePartnerClick">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </v-row>
    </v-sheet>

    <v-container class="pa-4" fluid>
      <v-list class="pa-0" dense>
        <v-list-item class="pa-0" v-show="partner.mobile">
          <v-list-item-content>SĐT:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ partner.mobile }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0" v-show="partner.address">
          <v-list-item-content>Địa Chỉ:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ partner.address }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0" v-show="partner.note">
          <v-list-item-content>Note:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ partner.note }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["partner"],
  created() {
  },
  computed: {
    canDelete() {
      return this.currentUser.admin === 1;
    },
    canMod() {
      return this.currentUser.admin != 0;
    },
    ...mapState({
      currentUser: state => state.login.currentUser
    })
  },
  methods: {
    editPartner() {
      this.setEditDialog(true);
      const partner = { ...this.partner };
      this.setEditingPartner(partner);
    },
    deletePartnerClick() {
      if (window.confirm(`Confirm DELETE ${this.partner.name}?`)) this.deletePartner(this.partner.id);
    },
    ...mapActions("partner", [
      "updateStatus",
      "deletePartner",
      "setEditingPartner",
      "setEditDialog"
    ])
  }
};
</script>

<style></style>
