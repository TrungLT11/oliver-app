import moment from "moment";
class Transfer {
  constructor(data) {
    this.transferId = data.TransferId;
    this.userId = data.UserId;
    this.transferDate = data.TransferDate;
    this.amounts = data.Amounts;
    this.vnd = data.vnd;
    this.country = data.Country;
    this.rate = data.Rate;
    this.comment = data.Comment;
    this.type = data.Type;
    this.bank = data.Bank;
    this.status = data.Status;
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
    if (this.status === 0) return "grey darken-2";
    if (this.status === 1) {
      if (this.type === 2) return "blue darken-3";
      if (this.type === 3) return "yellow darken-3";
      if (this.type === 4) return "red darken-3";
      return "green darken-3";
    }
  }

  get displayValue() {
    return numberWithCommas(this.vnd);
  }

  get transferDateValue() {
    return moment(this.transferDate).format("DD-MM-YYYY");
  }
  get transactionType() {
    if (this.type === 2) return "COD-HN";
    if (this.type === 3) return "COD-TINH";
    if (this.type === 4) return "OTHER";
    return "TDCK"
    
  }
}
const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const roundToThousandth = x => Math.ceil(x * 1000) / 1000;

export default Transfer;
