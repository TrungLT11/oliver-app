import api from "@/utils/api";
import User from "@/models/user";
export default {
  state: () => ({
    users: [],
    filterStatus: -1,
    filterType: "",
    filterUser: -1,
    filterCountry: -1,
    page: 1,
    rowsPerPage: 30,
    sortCol: "id",
    total: 0,
    totalUser: 0,
    fetching: false,
    editingUser: null,
    editDialog: false,
    createDialog: false,
    multiSelected: []
  }),

  mutations: {},

  getters: {},

  actions: {
    async fetchUsers({ state }) {
      const payload = {
        page: state.page,
        rowsPerPage: state.rowsPerPage,
        sortCol: state.sortCol,
        id: state.filterUser != -1 ? state.filterUser : undefined
      };
      state.fetching = true;
      const { data, total, totalUser } = await api.fetchUsers(payload);
      state.users = data.map(_i => new User(_i));
      state.total = total;
      state.totalUser = totalUser;
      state.fetching = false;
    },
    async updateStatus({ state, dispatch }, { status, id }) {
      await api.updateUserStatus({ id, status });
      dispatch("fetchUsers");
    },
    async deleteUser({ state, dispatch }, id) {
      await api.deleteUser({ id });
      dispatch("fetchUsers");
    },
    async createUser({ state, dispatch }, user) {
      await api.createUser({ user });
      alert("SUCCESS");
    },
    async updateUser({ state, dispatch }, { id, user }) {
      await api.updateUser({ id, user });
      dispatch("fetchUsers");
    },
    async changeMultiStatus({ state, dispatch }, status) {
      const selectedArray = state.multiSelected;
      await api.updateStatus({ id: selectedArray, status });
      dispatch("fetchUsers");
    },
    changeRowsPerPage({ state, dispatch }, value) {
      state.rowsPerPage = value;
      state.page = 1;
      dispatch("fetchUsers");
    },
    changePage({ state, dispatch }, value) {
      state.page = value;
      dispatch("fetchUsers");
    },
    changeFilterType({ state, dispatch }, value) {
      state.filterType = value || "";
      state.page = 1;
      dispatch("fetchUsers");
    },
    changeFilterUser({ state, dispatch }, value) {
      state.filterUser = value || -1;
      state.page = 1;
      dispatch("fetchUsers");
    },
    changeFilterStatus({ state, dispatch }, value) {
      const _v = value === null ? -1 : value;
      state.filterStatus = _v;
      state.page = 1;
      dispatch("fetchUsers");
    },
    changeFilterCountry({ state, dispatch }, value) {
      state.filterCountry = value || -1;
      state.page = 1;
      dispatch("fetchUsers");
    },
    setEditingUser({ state }, value) {
      state.editingUser = value;
    },
    setEditDialog({ state }, value) {
      state.editDialog = value;
    },
    setCreateDialog({ state }, value) {
      state.createDialog = value;
    },
    setMultiSelected({ state }, value) {
      state.multiSelected = value;
    },
    setSortCol({ state, dispatch }, value) {
      state.sortCol = value;
      dispatch("fetchUsers");
    }
  },
  namespaced: true
};
