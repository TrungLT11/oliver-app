<template>
  <v-app>
    <dashboard-core-app-bar @reload="forceRerender" />

    <dashboard-core-drawer />

    <dashboard-core-view :render="render" />
  </v-app>
</template>

<script>
import { isEmpty } from "lodash";
export default {
  name: "DashboardIndex",

  components: {
    DashboardCoreAppBar: () => import("./components/AppBar"),
    DashboardCoreDrawer: () => import("./components/Drawer"),
    DashboardCoreView: () => import("./components/View")
  },

  data: () => ({
    expandOnHover: false,
    render: true
  }),

  methods: {
    forceRerender() {
      this.render = false;
      if (!isEmpty(this.$route.query)) this.$router.push({ query: {} });
      this.$store.dispatch("order/reset");
      this.$store.dispatch("transfer/reset");
      this.$nextTick(() => {
        this.render = true;
      });
    }
  }
};
</script>
