import moment from "moment";
const userDataString = localStorage.getItem("user");
const userData = userDataString ? JSON.parse(userDataString) : {};

const newOrder = () => ({
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
  link: "",
  method: 0,
  note: "",
  offVal: 0,
  orderDate: moment().format("YYYY-MM-DD"),
  orderId: "",
  orderNumber: "",
  outM: "",
  price: "",
  quantity: 1,
  rate: "",
  shipWeb: 0,
  shippingCharge: "",
  site: "",
  size: "",
  status: 1,
  surCharge: 0,
  tax: 0,
  total: "",
  totalCommission: "",
  totalin: "",
  transfered: "",
  userId: userData.id,
  weight: 0,
  weightRate: 11.0
});

export default newOrder;
