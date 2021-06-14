<template>
  <v-dialog :value="editDialog" width="550" origin="bottom right" persistent>
    <v-form ref="form" @submit.prevent="submit">
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Sửa Đổi</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="cancel">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                :readonly="!currentUser.admin"
                v-model="user.user"
                label="Tên Đăng Nhập"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="user.pass"
                label="Mật Khẩu"
                prepend-inner-icon="mdi-lock"
              />
            </v-col>
          </v-row>
          <v-text-field
            v-model="user.email"
            label="Email/FB"
            prepend-inner-icon="mdi-email"
          />
          <v-row>
            <v-col>
              <v-text-field
                v-model="user.fullname"
                label="Họ Tên"
                prepend-inner-icon="mdi-account"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="user.mobile"
                label="SĐT"
                prepend-inner-icon="mdi-phone"
            /></v-col>
          </v-row>
          <v-text-field
            v-model="user.address"
            label="Địa Chỉ"
            prepend-inner-icon="mdi-map-marker"
          />
          <v-textarea
            v-model="user.note"
            label="Ghi chú"
            rows="2"
            prepend-inner-icon="mdi-note"
          />
          <v-menu
            v-model="birthdayDatePicker"
            :close-on-content-click="true"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="user.birthday"
                label="Sinh Nhật"
                prepend-inner-icon="mdi-cake"
                v-bind="attrs"
                v-on="on"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="user.birthday"
              class="ma-0 pa-0"
              @input="birthdayDatePicker = false"
            ></v-date-picker>
          </v-menu>
          <v-autocomplete
            v-if="user.admin != 1 && currentUser.admin === 1"
            v-model="user.admin"
            :items="adminOptions"
            label="Loại Admin"
            prepend-inner-icon="mdi-account-cog"
          >
          </v-autocomplete>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" depressed color="success" class="mr-2">
            CHẤP NHẬN
          </v-btn>
          <v-btn color="grey" text class="mr-0" @click="cancel">
            HỦY BỎ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";
import rules from "@/utils/formRules";
import md5 from "md5";
export default {
  props: ["userOptions"],
  data: () => ({
    rules,
    user: {
      user: "",
      email: "",
      pass: "",
      fullname: "",
      mobile: "",
      address: "",
      birthday: "",
      note: "",
      admin: 0
    },
    birthdayDatePicker: false,
    adminOptions: [0, 2]
  }),
  computed: {
    ...mapState({
      editDialog: state => state.user.editDialog,
      editingUser: state => state.user.editingUser,
      currentUser: state => state.login.currentUser
    })
  },
  methods: {
    submit() {
      if (!this.$refs.form.validate()) return false;
      const user = { ...this.user };
      if (!user.pass) delete user.pass;
      else user.pass = md5(user.pass);
      this.updateUser({ id: user.id, user });
      this.fetchUsers();
      this.cancel();
    },
    cancel() {
      this.$refs.form.reset();
      this.setEditDialog(false);
    },
    ...mapActions("user", ["setEditDialog", "updateUser", "fetchUsers"])
  },
  watch: {
    editDialog(val) {
      if (val) this.user = { ...this.editingUser };
    }
  }
};
</script>
