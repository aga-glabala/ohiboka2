export class User {
  private username : string;
  private email : string;
  private facebookId : string;
  private id : string;

  constructor(username : string, email : string) {
    this.username = username;
    this.email = email;
  }

  static createUser(obj: any) {
    let user = new User(obj.name, obj.email);

    user.facebookId = obj.facebook_id;
    user.id = obj.id || obj._id;

    return user;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getFacebookId() {
    return this.facebookId;
  }
}
