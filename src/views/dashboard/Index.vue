<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <!-- <dashboard-core-settings /> -->
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreView: () => import('./components/core/View'),
      DashboardCoreSettings: () => import('./components/core/Settings'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
