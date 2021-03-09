import request from "@/utils/request";
export default {
  fetchOrders: payload =>
    request.get("/apis/order", { params: { ...payload } }),
  fetchOrderCol: payload =>
    request.get("/apis/order-col", { params: { ...payload } }),
  updateStatus: payload => request.put("/apis/order-col", { ...payload }),
  deleteOrder: payload =>
    request.delete("/apis/order", { data: { ...payload } }),
  createOrder: payload => request.post("/apis/order", { ...payload }),
  updateOrder: payload => request.put("/apis/order", { ...payload }),

  fetchExchange: () => request.get("/apis/exchange")
};
