<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-form v-model="valid" @submit.prevent="submit">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Đăng Nhập</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
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
                  :append-icon="passwordIcon"
                  name="password"
                  label="Mật Khẩu"
                  :type="passwordType"
                  :rules="[rules.required]"
                  @click:append="triggerPassword"
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-btn block color="primary" type="submit" :loading="loading">
                  Đăng Nhập
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
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
  name: "Login",
  data: () => ({
    valid: false,
    showPassword: false,
    username: "",
    password: "",
    rules: rules,
    loading: false
  }),
  computed: {
    passwordType() {
      return this.showPassword ? "text" : "password";
    },
    passwordIcon() {
      return this.showPassword ? "mdi-eye-off-outline" : "mdi-eye-outline";
    }
  },
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
        const redirectPath = this.$route.query.redirect || "/order";
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        this.setCurrentUser(user);
        this.$router.push(redirectPath);
      } catch (error) {
        alert("Login Failed");
      } finally {
        this.loading = false;
      }
    },
    triggerPassword() {
      this.showPassword = !this.showPassword;
    },
    ...mapActions("login", ["setCurrentUser"])
  }
};
</script>

<style></style>
