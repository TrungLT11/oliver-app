import api from "@/utils/api";
import Exchange from "@/models/exchange";
export default {
  state: () => ({
    exchanges: [],
    fetching: false
  }),

  mutations: {},

  getters: {},

  actions: {
    async fetchExchange({state}) {
      let data = [];
      state.fetching = true;
      try {
        data = await api.fetchExchange();
      } finally {
        state.fetching = false;
      }
      return data.map(_i => new Exchange(_i));
    },
    updateExchangeRate({}, payload) {
      return api.updateExchange(payload);
    }
  },
  namespaced: true
};
