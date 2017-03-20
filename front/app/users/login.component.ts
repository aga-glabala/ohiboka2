import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';

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
          <div *ngIf="loginError" class="alert alert-danger">
            {{loginError}}
          </div>
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
        <div *ngIf="registerError" class="alert alert-danger">
          {{ registerError }}
        </div>
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
    constructor(public AuthService : AuthService, private router: Router) {
    }
    loginError = false;
    registerError = false;

    onFacebookLoginClick() {
      this.AuthService.loginFB().subscribe(
        (data) => {
          this.router.navigate(['/bracelets/index']);
        },
        (error) => {
          this.loginError = error.error.message;
        }
      );
    }

    login(login, password) {
      this.AuthService.login(login, password).subscribe(
        (data) => {
          this.router.navigate(['/bracelets/index']);
        },
        (error) => {
          this.loginError = error.error.message;
        }
      )
    }

    register(login, password, password2) {
      //if(password !== password2) {
      //  this.registerErrors['wrong-passwords'] = 'Passwords do not match';
      //  return false;
      //}
      this.AuthService.register(login, password, password2).subscribe(
        (data) => {
          this.router.navigate(['/bracelets/index']);
        },
        (error) => {
          this.registerError = error.error.message;
        }
      );
    }
 }
