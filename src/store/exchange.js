import api from "@/utils/api";
import Exchange from "@/models/exchange";
export default {
  state: () => ({
    exchanges: []
  }),

  mutations: {},

  getters: {},

  actions: {
    async fetchExchange() {
      const data = await api.fetchExchange();
      return data.map(_i => new Exchange(_i));
    }
  },
  namespaced: true
};
