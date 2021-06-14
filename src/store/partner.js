import api from "@/utils/api";
import Partner from "@/models/partner";
export default {
  state: () => ({
    partners: [],
    filterStatus: -1,
    filterType: "",
    filterPartner: -1,
    filterCountry: -1,
    page: 1,
    rowsPerPage: 30,
    sortCol: "id",
    total: 0,
    totalPartner: 0,
    fetching: false,
    editingPartner: null,
    editDialog: false,
    createDialog: false,
    multiSelected: []
  }),

  mutations: {},

  getters: {},

  actions: {
    async fetchPartners({ state }) {
      const payload = {
        page: state.page,
        rowsPerPage: state.rowsPerPage,
        sortCol: state.sortCol,
        id: state.filterPartner != -1 ? state.filterPartner : undefined
      };
      state.fetching = true;
      const { data, total, totalPartner } = await api.fetchPartners(payload);
      state.partners = data.map(_i => new Partner(_i));
      state.total = total;
      state.totalPartner = totalPartner;
      state.fetching = false;
    },
    async updateStatus({ state, dispatch }, { status, id }) {
      await api.updatePartnerStatus({ id, status });
      dispatch("fetchPartners");
    },
    async deletePartner({ state, dispatch }, id) {
      await api.deletePartner({ id });
      dispatch("fetchPartners");
    },
    async createPartner({ state, dispatch }, partner) {
      await api
        .createPartner({ partner })
        .catch(({ response }) =>
          alert(response?.data?.message || "ERROR - create partner")
        )
        .then(() => alert("SUCCESS"));
    },
    async updatePartner({ state, dispatch }, { id, partner }) {
      await api.updatePartner({ id, partner });
      dispatch("fetchPartners");
    },
    async changeMultiStatus({ state, dispatch }, status) {
      const selectedArray = state.multiSelected;
      await api.updateStatus({ id: selectedArray, status });
      dispatch("fetchPartners");
    },
    changeRowsPerPage({ state, dispatch }, value) {
      state.rowsPerPage = value;
      state.page = 1;
      dispatch("fetchPartners");
    },
    changePage({ state, dispatch }, value) {
      state.page = value;
      dispatch("fetchPartners");
    },
    changeFilterType({ state, dispatch }, value) {
      state.filterType = value || "";
      state.page = 1;
      dispatch("fetchPartners");
    },
    changeFilterPartner({ state, dispatch }, value) {
      state.filterPartner = value || -1;
      state.page = 1;
      dispatch("fetchPartners");
    },
    changeFilterStatus({ state, dispatch }, value) {
      const _v = value === null ? -1 : value;
      state.filterStatus = _v;
      state.page = 1;
      dispatch("fetchPartners");
    },
    changeFilterCountry({ state, dispatch }, value) {
      state.filterCountry = value || -1;
      state.page = 1;
      dispatch("fetchPartners");
    },
    setEditingPartner({ state }, value) {
      state.editingPartner = value;
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
      dispatch("fetchPartners");
    }
  },
  namespaced: true
};
