<template>
  <v-app-bar flat floating absolute app dense>
    <v-app-bar-nav-icon @click="setDrawer(!drawer)" small></v-app-bar-nav-icon>
    <!-- <v-btn icon text small @click="setDrawer(!drawer)">
      <v-icon>
        mdi-view-quilt
      </v-icon>
    </v-btn> -->

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light body-2"
      v-text="$route.name"
    />

    <v-spacer />

    <!-- <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 165px;"
    >
    </v-text-field> -->

    <!-- <div class="mx-3" /> -->

    <!-- <v-btn class="ml-2" min-width="0" text to="/" small>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn class="ml-2" min-width="0" text to="/pages/user" small>
      <v-icon>mdi-account</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>

<script>
// Utilities
import { mapState, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapState(["drawer"])
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    })
  }
};
</script>
