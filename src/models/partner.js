export default class User {
  constructor(data) {
    this.address = data.address || "";
    this.name = data.name || "";
    this.id = data.id || "";
    this.mobile = data.mobile || "";
    this.note = data.note || "";
  }
  get avatarText() {
    return this.user.substring(0, 2);
  }
}
