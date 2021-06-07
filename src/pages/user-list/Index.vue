<template>
  <div>
    <v-app-bar elevation="3" v-show="currentUser.admin">
      <Filters />
    </v-app-bar>
    <v-container class="pa-6" fluid>
      <ActionMenu v-if="currentUser.admin" />
      <v-row>
        <v-col
          v-for="user in users"
          :key="user.userId"
          cols="12"
          v-bind="{ sm: currentUser.admin ? 6 : 12 }"
        >
          <User :user="user" /> </v-col
      ></v-row>
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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "UserList",
  components: {
    User: () => import("./components/User"),
    Filters: () => import("./components/Filter"),
    Pagination: () => import("./components/Pagination"),
    ActionMenu: () => import("./components/ActionMenu")
  },
  data() {
    return {
      // editingUser: null,
      // editDialog: false
    };
  },
  computed: {
    ...mapState({
      users: state => state.user.users,
      fetching: state => state.user.fetching,
      currentUser: state => state.login.currentUser
    })
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    ...mapActions("user", ["fetchUsers", "setEditingUser", "setEditDialog"])
  }
};
</script>
