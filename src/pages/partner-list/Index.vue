<template>
  <v-container class="pa-6" fluid>
    <CreatePartnerDialog />
    <EditPartnerDialog />
    <ActionMenu v-if="currentUser.admin" />
    <v-row>
      <v-col
        v-for="partner in partners"
        :key="partner.partnerId"
        cols="12"
        v-bind="{ sm: currentUser.admin ? 6 : 12 }"
      >
        <Partner :partner="partner" />
      </v-col>
    </v-row>
    <Pagination v-if="currentUser.admin" />
    <v-overlay :value="fetching" opacity=".75">
      <v-progress-circular
        indeterminate
        :size="50"
        :width="5"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "PartnerList",
  components: {
    Partner: () => import("./components/Partner"),
    Pagination: () => import("./components/Pagination"),
    ActionMenu: () => import("./components/ActionMenu"),
    CreatePartnerDialog: () => import("./components/CreatePartnerDialog"),
    EditPartnerDialog: () => import("./components/EditPartnerDialog")
  },
  computed: {
    ...mapState({
      partners: state => state.partner.partners,
      fetching: state => state.partner.fetching,
      currentUser: state => state.login.currentUser
    })
  },
  created() {
    this.fetchPartners();
  },
  methods: {
    ...mapActions("partner", ["fetchPartners"])
  }
};
</script>
