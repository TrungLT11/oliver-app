<template>
  <div id="settings-wrapper">
    <v-btn
      v-tooltip="'Đăng xuất'"
      id="logout"
      class="ma-2"
      min-width="0"
      icon
      large
      @click="logout()"
    >
      <v-icon>mdi-logout</v-icon>
    </v-btn>
    <v-btn id="settings" class="ma-2" min-width="0" icon large>
      <v-icon>mdi-cog</v-icon>
    </v-btn>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="#settings"
      content-class="v-settings"
      top
      right
      nudge-right="8"
      origin="bottom left"
      transition="scale-transition"
    >
      <v-card class="text-center mb-0" width="300">
        <v-card-text>
          <strong class="mb-3 d-inline-block">Màu sắc chính</strong>

          <v-item-group v-model="color">
            <v-item v-for="color in colors" :key="color" :value="color">
              <template v-slot="{ active, toggle }">
                <v-avatar
                  :class="active && 'v-settings__item--active'"
                  :color="color"
                  class="v-settings__item"
                  size="25"
                  @click="toggle"
                />
              </template>
            </v-item>
          </v-item-group>

          <v-divider class="my-4 secondary" />

          <v-row align="center" no-gutters>
            <v-col cols="auto" class="mr-2">
              <v-icon @click="menu = false">mdi-close-circle</v-icon>
            </v-col>
            <v-col cols="auto">
              Chế độ tối
            </v-col>

            <v-spacer />

            <v-col cols="auto">
              <v-switch
                v-model="$vuetify.theme.dark"
                class="ma-0 pa-0"
                color="secondary"
                hide-details
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
// Mixins
import Proxyable from "vuetify/lib/mixins/proxyable";
import { mapMutations, mapState } from "vuex";

export default {
  name: "DashboardCoreSettings",

  mixins: [Proxyable],

  data: () => ({
    color: "#4CAF50",
    colors: ["#424242", "#2196F3", "#4CAF50", "#ff9800", "#F44336"],
    image:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
    images: [
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-2.jpg",
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-3.jpg",
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-4.jpg"
    ],
    menu: false,
    saveImage: "",
    showImg: true
  }),

  computed: {
    ...mapState(["barImage"])
  },

  watch: {
    color(val) {
      this.$vuetify.theme.themes[
        this.$vuetify.theme.dark ? "dark" : "light"
      ].primary = val;
    },
    showImg(val) {
      if (!val) {
        this.saveImage = this.barImage;
        this.setBarImage("");
      } else if (this.saveImage) {
        this.setBarImage(this.saveImage);
        this.saveImage = "";
      } else {
        this.setBarImage(val);
      }
    },
    image(val) {
      this.setBarImage(val);
    }
  },

  methods: {
    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    ...mapMutations({
      setBarImage: "SET_BAR_IMAGE"
    })
  }
};
</script>

<style lang="sass">
.v-settings
  .v-item-group > *
    cursor: pointer

  &__item
    border-width: 3px
    border-style: solid
    border-color: transparent !important

    &--active
      border-color: #00cae3 !important
</style>
