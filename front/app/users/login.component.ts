import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

declare const FB:any;

@Component({
  selector: 'login',
  template: `
    <div>
    	<button class="btn btn-lg btn-social btn-facebook" style="font-size: 1.5em;" (click)="onFacebookLoginClick()">
    	    <i class="fa fa-facebook fa-fw"></i>Sign in with Facebook
    	</button>
    </div>
  `
})
export class LoginComponent implements OnInit {
    constructor(public AuthService : AuthService) {
    }

    onFacebookLoginClick() {
      let that = this;
      FB.login(function(response) {
        console.log(response, this.AuthService);
        that.AuthService.loginFB(response);
      },{
        scope: 'email'
      });
    }

    statusChangeCallback(resp) {


    };
    ngOnInit() {

    }
 }
