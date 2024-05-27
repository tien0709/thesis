class User {
  constructor(id, account, name, email, phone, pw) {
    (this.id = id),
      (this.account = account),
      (this.name = name),
      (this.email = email),
      (this.phone = phone),
      (this.pw = pw);
  }
}

module.exports = User;