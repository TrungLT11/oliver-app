import moment from "moment";
const userDataString = localStorage.getItem("user");
const userData = userDataString ? JSON.parse(userDataString) : {};

const newOrder = (id) => ({
  arrivalDate: "",
  brand: "",
  chargeMoney: "",
  chargePercent: 5,
  chargeRawValue: 5,
  color: "",
  country: 1,
  debt: "",
  gcCode: "",
  imgLink: "",
  inM: "",
  inVnd: 1,
  link: "",
  method: 0,
  note: "",
  offVal: 0,
  orderDate: moment().format("YYYY-MM-DD"),
  orderId: id,
  orderNumber: "",
  outM: "",
  outVnd: 1,
  price: "",
  quantity: 1,
  rate: "",
  shipWeb: 0,
  shippingCharge: "",
  site: "",
  size: "",
  status: userData.admin ? 1 : 0,
  surCharge: 0,
  tax: 10,
  total: "",
  totalCommission: "",
  totalin: "",
  transfered: "",
  sellerId: 0,
  userId: userData.id,
  weight: 0,
  weightRate: 11.0
});

export default newOrder;
