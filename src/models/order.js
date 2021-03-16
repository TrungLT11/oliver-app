import moment from "moment";
class Order {
  constructor(data) {
    this.arrivalDate = data.ArrivalDate;
    this.brand = data.Brand;
    this.chargeMoney = data.ChargeMoney;
    this.chargePercent = data.ChargePercent;
    this.color = data.Color;
    this.country = data.Country;
    this.debt = data.Debt;
    this.gcCode = data.GcCode;
    this.imgLink = data.ImgLink;
    this.inM = data.InM;
    this.link = data.Link;
    this.method = data.Method;
    this.note = data.Note;
    this.offVal = data.OffVal;
    this.orderDate = moment(data.OrderDate).format("YYYY-MM-DD");
    this.orderId = data.OrderId;
    this.orderNumber = data.OrderNumber;
    this.outM = data.OutM;
    this.price = data.Price;
    this.quantity = data.Quantity;
    this.rate = data.Rate;
    this.shipWeb = data.ShipWeb;
    this.shippingCharge = data.ShippingCharge;
    this.site = data.Site;
    this.size = data.Size;
    this.status = data.Status;
    this.surCharge = data.SurCharge;
    this.tax = data.Tax;
    this.total = data.Total;
    this.totalCommission = data.TotalCommission;
    this.totalin = data.Totalin;
    this.transfered = data.Transfered;
    this.userId = data.UserId;
    this.weight = data.Weight;
    this.weightRate = data.WeightRate;
    // USER INFO
    this.user = {
      username: data.user,
      email: data.email,
      fullname: data.fullname,
      mobile: data.mobile,
      address: data.address,
      note: data.note,
      birthday: data.birthday
    };
  }

  get cardColor() {
    let result = "";
    switch (this.status) {
      case 0:
        result = "grey";
        break;
      case 1:
        result = "orange";
        break;
      case 2:
        result = "red";
        break;
      case 3:
        result = "green";
        break;
      case 4:
        result = "blue";
        break;
      case 5:
        result = "blue darken-4";
        break;
    }
    return result;
  }

  get countryName() {
    let result = "";
    switch (this.country) {
      case 1:
        result = "USA";
        break;
      case 2:
        result = "UK";
        break;
      case 3:
        result = "SPAIN";
        break;
      case 4:
        result = "KOREA";
        break;
    }
    return result;
  }

  get countryColor() {
    let result = "";
    switch (this.country) {
      case 1:
        result = "green";
        break;
      case 2:
        result = "blue";
        break;
      case 3:
        result = "orange";
        break;
      case 4:
        result = "red";
        break;
    }
    return result;
  }

  get orderTime() {
    return new Date(this.orderDate).toLocaleDateString();
  }

  get hostName() {
    return getHostnameFromRegex(this.link) || this.link;
  }

  get offPrice() {
    const result = (1 - this.offVal / 100) * this.quantity * this.price;
    return result.toFixed(2);
  }

  get chargeValue() {
    if (this.chargePercent == 0)
      return numberWithCommas(Math.round(this.chargeMoney * this.rate));
    else return 100 * this.chargePercent + "%";
  }

  get chargeRawValue() {
    if (this.chargePercent == 0)
      return Math.round(this.chargeMoney * this.rate);
    else return 100 * this.chargePercent;
  }

  get weightValue() {
    return this.weight;
  }

  get shippingValue() {
    return numberWithCommas(Math.round(this.shippingCharge * this.rate));
  }

  get totalInValue() {
    return numberWithCommas(Math.round(this.totalin * this.rate));
  }

  get totalOutValue() {
    return numberWithCommas(Math.round(this.total * this.rate));
  }

  get totalValue() {
    return numberWithCommas(
      Math.round((this.total + this.shippingCharge) * this.rate)
    );
  }

  get totalCommissionValue() {
    return numberWithCommas(Math.round(this.totalCommission * this.rate));
  }
}
const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const roundToThousandth = x => Math.ceil(x * 1000) / 1000;

const getHostnameFromRegex = url => {
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  return matches && matches[1];
};
export default Order;
