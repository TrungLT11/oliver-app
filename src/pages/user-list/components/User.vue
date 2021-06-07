<template>
  <v-sheet elevation="2" rounded="b-lg t-xl">
    <v-sheet
      class="pa-3"
      elevation="2"
      :color="user.cardColor"
      dark
      rounded="xl"
    >
      <v-row align="center">
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <span class="text-h4" v-text="user.user"></span>
        <v-spacer></v-spacer>
        <v-btn icon @click="editUser">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-if="canDelete" icon @click="deleteUserClick">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>
      </v-row>
    </v-sheet>

    <v-container class="pa-4" fluid>
      <v-list class="pa-0" dense>
        <v-list-item class="pa-0" v-show="user.fullname">
          <v-list-item-content>Họ Tên:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ user.fullname }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0" v-show="user.email">
          <v-list-item-content>Email/Link FB:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ user.email }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0" v-show="user.mobile">
          <v-list-item-content>SĐT:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ user.mobile }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0" v-show="user.address">
          <v-list-item-content>Địa Chỉ:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ user.address }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0" v-show="user.note">
          <v-list-item-content>Note:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ user.note }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="pa-0" v-show="user.birthday">
          <v-list-item-content>Sinh nhật:</v-list-item-content>
          <v-list-item-content class="align-end">
            {{ user.birthday }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: ["user"],
  components: {
    UserDropdown: () => import("./UserDropdown")
  },
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
    editUser() {
      this.setEditDialog(true);
      const user = { ...this.user };
      this.setEditingUser(user);
    },
    deleteUserClick() {
      if (window.confirm(`Confirm DELETE ${this.user.user}?`)) this.deleteUser(this.user.id);
    },
    ...mapActions("user", [
      "updateStatus",
      "deleteUser",
      "setEditingUser",
      "setEditDialog"
    ])
  }
};
</script>

<style></style>
