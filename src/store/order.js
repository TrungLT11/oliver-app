import api from "@/utils/api";
import Order from "@/models/order";
import newOrder from "@/models/NewOrder";
import { last } from "lodash";
const initState = () => ({
  orders: [],
  filterStatus: -1,
  filterSite: "",
  filterOrderNumber: "",
  filterUser: -1,
  filterPartner: -1,
  filterCountry: -1,
  page: 1,
  rowsPerPage: 10,
  total: 0,
  fetching: false,
  editingOrder: newOrder(),
  editDialog: false,
  cloningOrder: newOrder(),
  cloneDialog: false,
  multiSelected: []
});
export default {
  state: initState(),

  mutations: {},

  getters: {
    conditionPayload: state => {
      const {
        filterSite,
        filterOrderNumber,
        filterStatus,
        filterUser,
        filterPartner,
        filterCountry
      } = state;
      const payload = {};
      if (filterSite.length) payload[`orders.Site`] = filterSite;
      if (filterOrderNumber.length)
        payload[`orders.OrderNumber`] = filterOrderNumber;
      if (filterStatus != -1) payload[`orders.Status`] = filterStatus;
      if (filterCountry != -1) payload[`orders.Country`] = filterCountry;
      if (filterPartner != -1) payload[`orders.Method`] = filterPartner;
      return payload;
    },
    selectedOrders: state =>
      state.orders.filter(s => state.multiSelected.includes(s.orderId)),
    selectedOrdersUserId: state =>
      state.orders.find(s => last(state.multiSelected) === s.orderId)?.user.id
  },

  actions: {
    async fetchOrders({ state }) {
      const {
        filterSite,
        filterOrderNumber,
        filterStatus,
        filterUser,
        filterPartner,
        filterCountry
      } = state;
      const payload = {
        page: state.page,
        rowsPerPage: state.rowsPerPage
      };
      if (filterSite.length) payload[`orders.Site`] = filterSite;
      if (filterOrderNumber.length)
        payload[`orders.OrderNumber`] = filterOrderNumber;
      if (filterStatus != -1) payload[`orders.Status`] = filterStatus;
      if (filterCountry != -1) payload[`orders.Country`] = filterCountry;
      if (filterUser != -1) payload[`orders.UserId`] = filterUser;
      if (filterPartner != -1) payload[`orders.Method`] = filterPartner;
      state.fetching = true;
      const { data, total } = await api.fetchOrders(payload);
      state.orders = data.map(_i => new Order(_i));
      state.total = total;
      state.fetching = false;
    },
    async fetchOrderCol({ state }, { table, colName, orderBy }) {
      const { data = [] } = await api.fetchOrderCol({
        table,
        colName,
        orderBy
      });
      return data;
    },
    async updateStatus({ state, dispatch }, { status, id }) {
      await api.updateStatus({ id, status });
      dispatch("fetchOrders");
    },
    async deleteOrder({ state, dispatch }, id) {
      await api.deleteOrder({ id });
      dispatch("fetchOrders");
    },
    async createOrder({ state, dispatch }, order) {
      await api.createOrder({ order });
      alert("SUCCESS");
    },
    async updateOrder({ state, dispatch }, { id, order }) {
      await api.updateOrder({ id, order });
      dispatch("fetchOrders");
    },
    async changeMultiStatus({ state, dispatch }, status) {
      const selectedArray = state.multiSelected;
      await api.updateStatus({ id: selectedArray, status });
      dispatch("fetchOrders");
    },
    changeRowsPerPage({ state, dispatch }, value) {
      state.rowsPerPage = value;
      state.page = 1;
      dispatch("fetchOrders");
    },
    changePage({ state, dispatch }, value) {
      state.page = value;
      dispatch("fetchOrders");
    },
    changeFilterSite({ state, dispatch }, value) {
      state.filterSite = value || "";
      state.page = 1;
      dispatch("fetchOrders");
    },
    changeFilterOrderNumber({ state, dispatch }, value) {
      state.filterOrderNumber = value || "";
      state.page = 1;
      dispatch("fetchOrders");
    },
    changeFilterUser({ state, dispatch }, value) {
      state.filterUser = value || -1;
      state.page = 1;
      dispatch("fetchOrders");
    },
    changeFilterPartner({ state, dispatch }, value) {
      state.filterPartner = value || -1;
      state.page = 1;
      dispatch("fetchOrders");
    },
    changeFilterStatus({ state, dispatch }, value) {
      const _v = value === null ? -1 : value;
      state.filterStatus = _v;
      state.page = 1;
      dispatch("fetchOrders");
    },
    changeFilterCountry({ state, dispatch }, value) {
      state.filterCountry = value || -1;
      state.page = 1;
      dispatch("fetchOrders");
    },
    setEditingOrder({ state }, value) {
      state.editingOrder = value;
    },
    setEditDialog({ state }, value) {
      state.editDialog = value;
    },
    setCloningOrder({ state }, value) {
      state.cloningOrder = value;
    },
    setCloneDialog({ state }, value) {
      state.cloneDialog = value;
    },
    setMultiSelected({ state }, value) {
      state.multiSelected = value;
    },
    reset({ state }) {
      Object.assign(state, initState());
    }
  },
  namespaced: true
};
