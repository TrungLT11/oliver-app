import request from "@/utils/request";
export default {
  /** ORDER API */
  fetchOrders: payload =>
    request.get("/apis/order", { params: { ...payload } }),
  fetchOrderCol: payload =>
    request.get("/apis/order-col", { params: { ...payload } }),
  updateStatus: payload => request.put("/apis/order-col", { ...payload }),
  deleteOrder: payload =>
    request.delete("/apis/order", { data: { ...payload } }),
  createOrder: payload => request.post("/apis/order", { ...payload }),
  updateOrder: payload => request.put("/apis/order", { ...payload }),

  /** EXCHANGE API */
  fetchExchange: () => request.get("/apis/exchange"),
  updateExchange: payload => request.put("/apis/exchange", payload),

  /** TRANSFER API */
  fetchTransfers: payload =>
    request.get("/apis/transfer", { params: { ...payload } }),
  fetchTransferCol: payload =>
    request.post("/apis/transfer-col", { ...payload }),
  updateTransferStatus: payload =>
    request.put("/apis/transfer-col", { ...payload }),
  deleteTransfer: payload =>
    request.delete("/apis/transfer", { data: { ...payload } }),
  createTransfer: payload => request.post("/apis/transfer", { ...payload }),
  updateTransfer: payload => request.put("/apis/transfer", { ...payload }),

  /** USER API */
  getUser: id => request.get(`/apis/user/${id}`),

  fetchUsers: payload => request.get("/apis/user", { params: { ...payload } }),
  fetchUserCol: payload =>
    request.get("/apis/user-col", { params: { ...payload } }),
  updateUserStatus: payload => request.put("/apis/user-col", { ...payload }),
  deleteUser: payload => request.delete("/apis/user", { data: { ...payload } }),
  createUser: payload => request.post("/apis/user", { ...payload }),
  updateUser: payload => request.put("/apis/user", { ...payload }),

  /** PARTNER API */
  getPartner: id => request.get(`/apis/partner/${id}`),

  fetchPartners: payload =>
    request.get("/apis/partner", { params: { ...payload } }),
  fetchPartnerCol: payload =>
    request.get("/apis/partner-col", { params: { ...payload } }),
  updatePartnerStatus: payload =>
    request.put("/apis/partner-col", { ...payload }),
  deletePartner: payload =>
    request.delete("/apis/partner", { data: { ...payload } }),
  createPartner: payload => request.post("/apis/partner", { ...payload }),
  updatePartner: payload => request.put("/apis/partner", { ...payload }),

  /** STATS API */
  getStatsByDay: payload => request.post("/apis/stats", { ...payload }),
  getStats: payload => request.post("/apis/getStats", { ...payload })
};
