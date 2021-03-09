class Order {
  constructor(data) {
    this.rate = parseInt(data.rate);
    this.arrivalDate = data.arrivalDate;
    this.brand = data.brand;
    this.chargeMoney = data.chargeMoney || 0;
    this.chargePercent = data.chargePercent || 0;
    this.color = data.color;
    this.country = data.country;
    this.debt = data.debt;
    this.gcCode = data.gcCode;
    this.imgLink = data.imgLink;
    this.inM = data.inM;
    this.link = data.link;
    this.method = data.method;
    this.note = data.note;
    this.offVal = data.offVal || 0;
    this.orderDate = data.orderDate;
    this.orderId = data.orderId;
    this.orderNumber = data.orderNumber;
    this.outM = data.outM;
    this.price = data.price || 0;
    this.quantity = data.quantity || 0;
    this.rate = data.rate;
    this.shipWeb = data.shipWeb || 0;
    this.shippingCharge = data.shippingCharge || 0;
    this.site = data.site;
    this.size = data.size;
    this.status = data.status;
    this.surCharge = data.surCharge || 0;
    this.tax = data.tax;
    this.total = data.total;
    this.totalCommission = data.totalCommission;
    this.totalin = data.totalin || 0;
    this.transfered = data.transfered || 0;
    this.userId = data.userId;
    this.weight = data.weight || 0;
    this.weightRate = data.weightRate || 0;
    this.inM = 0;
    this.outM = 0;

    if (!this.shippingCharge)
      this.shippingCharge = this.weight * this.weightRate;
    if (!this.totalin) {
      this.totalin =
        this.quantity * (1 - this.offVal / 100) * this.price +
        this.surCharge +
        this.shipWeb;
    } else {
      this.totalin = this.totalin / this.rate;
      this.inM = 1;
    }
    if (!this.total) {
      this.total =
        this.quantity *
          (1 - this.offVal / 100) *
          this.price *
          (1 + this.chargePercent + this.tax / 100) +
        this.surCharge +
        this.shipWeb +
        this.chargeMoney;
    } else {
      this.total = this.total / this.rate;
      this.outM = 1;
    }
    if (!this.totalCommission) {
      this.totalCommission = this.total - this.totalin;
    }
    if (data.fullyTransfered) {
      this.transfered = this.total * this.rate;
    }
    this.debt =
      (this.total + this.shippingCharge) * this.rate - this.transfered;
    this.debt = roundUpMoneyToK(this.debt);
  }
}
const roundUpMoneyToK = num => Math.ceil(num / 1000) * 1000;
export default Order;
