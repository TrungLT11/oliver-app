import Vue from "vue";
import Vuex from "vuex";

import login from "@/store/login";
import order from "@/store/order";
import transfer from "@/store/transfer";
import exchange from "@/store/exchange";
import user from "@/store/user";
import partner from "@/store/partner";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
    drawer: null
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    }
  },
  actions: {},
  modules: { order, exchange, login, transfer, user, partner }
});
