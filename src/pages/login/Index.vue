<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Đăng Nhập</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form v-model="valid">
                <v-text-field
                  v-model="username"
                  prepend-icon="mdi-account"
                  name="login"
                  label="Tên Đăng Nhập"
                  type="text"
                  :rules="[rules.required]"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Mật Khẩu"
                  type="password"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="submit" :loading="loading"
                >Đăng Nhập</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import md5 from "md5";
import rules from "@/utils/formRules";
import axios from "axios";
import { mapActions } from "vuex";

const login = async payload => {
  const baseUrl = process.env.VUE_APP_BASE_URL;
  return await axios.post(baseUrl + "/api/login", payload);
};

export default {
  data: () => ({
    valid: false,
    username: "",
    password: "",
    rules: rules,
    loading: false
  }),
  methods: {
    async submit() {
      if (!this.valid) return false;
      const payload = {
        username: this.username,
        password: md5(this.password)
      };
      try {
        this.loading = true;
        const {
          data: { data: user, token }
        } = await login(payload);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        this.setCurrentUser(user);
        this.$router.push("/");
      } catch (error) {
        alert("Login Failed");
      } finally {
        this.loading = false;
      }
    },
    ...mapActions("login", ["setCurrentUser"])
  }
};
</script>

<style></style>
