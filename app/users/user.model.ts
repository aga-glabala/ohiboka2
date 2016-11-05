export class User {
  private username : string;
  private email : string;

  constructor(username : string, email : string) {
    this.username = username;
    this.email = email;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }
}
