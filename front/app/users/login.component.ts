import { Component } from '@angular/core';
import { AuthService } from './auth.service';

declare const FB:any;

@Component({
  selector: 'login',
  template: `
  <h1>Logowanie i rejestracja</h1>
  <div class="row">
    <div class="col-md-12">
      <button class="btn btn-lg btn-info" style="font-size: 1.5em;" (click)="onFacebookLoginClick()">
          <i class="fa fa-facebook fa-fw"></i>Sign in with Facebook
      </button>
      <hr>
    </div>
    <div class="col-md-6">
      <h2>Logowanie</h2>
      <form (submit)="login(loginEmail.value, loginPassword.value)">
          <div class="form-group">
              <label for="login-email">Email</label>
              <input type="text" id="login-email" class="form-control" name="email" #loginEmail>
          </div>
          <div class="form-group">
              <label for="login-password">Password</label>
              <input type="password" id="login-password" class="form-control" name="password" #loginPassword>
          </div>

          <button type="submit" class="btn btn-warning btn-lg">Login</button>
      </form>
    </div>
    <div class="col-md-6">
      <h2>Rejestracja</h2>
      <form (submit)="register(registerEmail.value, registerPassword.value,registerPassword2.value)">
        <div class="form-group">
            <label for="register-email">Email</label>
            <input type="text" class="form-control" name="email" #registerEmail id="register-email">
        </div>
        <div class="form-group">
            <label for="register-password">Password</label>
            <input type="password" class="form-control" name="password" #registerPassword id="register-password">
        </div>
        <div class="form-group">
            <label for="register-password2">Repeat password</label>
            <input type="password" class="form-control" name="password2" #registerPassword2 id="register-password2">
        </div>

        <button type="submit" class="btn btn-warning btn-lg">Signup</button>
      </form>
    </div>
  </div>
  `
})
export class LoginComponent {
    constructor(public AuthService : AuthService) {
    }

    onFacebookLoginClick() {
      this.AuthService.loginFB();
    }

    login(login, password) {
      console.log(login, password);
      this.AuthService.login(login, password).subscribe(
        (data) => {
          console.log(data);
        }
      );
    }

    register(login, password, password2) {
      console.log(login, password, password2);
      this.AuthService.register(login, password, password2).subscribe(
        (data) => {
          console.log(data);
        }
      );
    }
 }
