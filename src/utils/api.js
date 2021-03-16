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
  updateExchange: (payload) => request.put("/apis/exchange", payload),

  /** TRANSFER API */
  fetchTransfers: payload =>
    request.get("/apis/transfer", { params: { ...payload } }),
  fetchTransferCol: payload =>
    request.get("/apis/transfer-col", { params: { ...payload } }),
  updateTransferStatus: payload => request.put("/apis/transfer-col", { ...payload }),
  deleteTransfer: payload =>
    request.delete("/apis/transfer", { data: { ...payload } }),
  createTransfer: payload => request.post("/apis/transfer", { ...payload }),
  updateTransfer: payload => request.put("/apis/transfer", { ...payload })
};
