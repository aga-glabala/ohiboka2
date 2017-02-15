import { Injectable }     from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CookieService } from 'angular2-cookie/core';
import { User } from './user.model';
import {AppService} from '../app.service';

@Injectable()
export class AuthService { 
  public token: string;

  private loggedUser : BehaviorSubject<User>;

  constructor (private http: Http, private _cookieService:CookieService) {
    this.loggedUser = new BehaviorSubject(undefined);

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser) {
      this.token = currentUser.token;
      this.loggedUser.next(new User(currentUser.username, undefined));
    }
  }

  public login(login: string, password: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let that = this;
    return this.http.post(AppService.API + "users/login", {email: login, password: password} ,options)
                    .map((data) => {
                      if(data.status == 200) {
                        let response = data.json();
                        let user = new User(response.user.local.name, response.user.local.email);
                        that.loggedUser.next(user);
                        let token = response.token;
                        if (token) {
                          // set token property
                          this.token = token;

                          // store username and jwt token in local storage to keep user logged in between page refreshes
                          localStorage.setItem('currentUser', JSON.stringify({ username: response.user.local.name, token: token }));
                        }
                        return { status: 1, user: user };
                      } else {
                        let response = data.json();
                        return { status: 0, user: null, message: response.message };
                      }
                    });
  }

  public register(login: string, password: string, password2: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let that = this;
    return this.http.post(AppService.API + "users/register", {email: login, password: password, password2: password2} ,options)
                    .map((data) => {
                      if(data.status == 200) {
                        let response = data.json();
                        let user = new User(response.user.local.name, response.user.local.email);
                        that.loggedUser.next(user);
                        return { status: 1, user: user };
                      } else {
                        let response = data.json();
                        return { status: 0, user: null, message: response.message };
                      }
                    });
  }

  public logout() {
    this.loggedUser.next(null);
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  public getUser() {
    return this.loggedUser.asObservable();
  }

  public isLoggedUser() {
    if(this.loggedUser.getValue()) return true;
  }
/*
  private isLoggedFB() {
    let that = this;
    FB.getLoginStatus(response => {

      if (response.status === 'connected') {
        FB.api('/me?fields=email,name', function(resp) {
          that.loginFB()
        });
        // connect here with your server for facebook login by passing access token given by facebook
      } else if (response.status === 'not_authorized') {
        console.log(response);
        this.logout();
      } else {
        console.log(response);
        this.logout();
      }
    },
    true);
  }
  */
  public loginFB() {
    let that = this;
    FB.login(function(response) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      that.http.post(AppService.API + "users/facebooklogin",response.authResponse,options)
                    .subscribe((data) => {
                      console.log('a', data)
                    });
      that.loggedUser.next(new User(response.name, response.email));
    },{
      scope: 'email'
    });
  }
}
