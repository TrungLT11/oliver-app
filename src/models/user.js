export default class User {
  constructor(data) {
    this.address = data.address || "";
    this.admin = data.admin;
    this.birthday = data.birthday || "";
    this.email = data.email || "";
    this.fullname = data.fullname || "";
    this.id = data.id || "";
    this.mobile = data.mobile || "";
    this.note = data.note || "";
    this.pass = data.pass || "";
    this.user = data.user || "";
  }

  get cardColor() {
    return this.admin === 1 ? "primary" : this.admin != 0 ? "blue" : "grey darken-3";
  }

  get avatarText() {
    return this.user.substring(0, 2);
  }
}
