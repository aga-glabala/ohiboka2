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
      <form action="/login" method="post">
          <div class="form-group">
              <label>Email</label>
              <input type="text" class="form-control" name="email">
          </div>
          <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" name="password">
          </div>

          <button type="submit" class="btn btn-warning btn-lg">Login</button>
      </form>
    </div>
    <div class="col-md-6">
      <h2>Rejestracja</h2>
      <form action="/signup" method="post">
        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" name="email">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" name="password">
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
 }
