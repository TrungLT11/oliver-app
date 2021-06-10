<template>
  <v-main>
    <router-view v-if="render"/>
  </v-main>
</template>

<script>
  export default {
    name: 'DashboardCoreView',
    props: ["render"]
  }
</script>
