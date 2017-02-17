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
      this._login(currentUser.token, new User(currentUser.username, undefined));
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
                        let token = response.token;
                        let user = new User(response.user.name, response.user.email);
                        this._login(token, user);
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
                        let user = new User(response.user.name, response.user.email);
                        let token = response.token;
                        this._login(token, user);
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

  public verifyUser() {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = new RequestOptions({ headers: headers });
    let that = this;
    return this.http.post(AppService.API + "private/users/verify", {} ,options)
                    .map((data) => {
                      let response = data.json();
                      if(response.status == 1) {
                        let user = User.createUser(response.user);
                        this.loggedUser.next(user);
                        return user;
                      } else {
                        return response;
                      }
                    });
  }

  private _login(token, user) {
    this.loggedUser.next(user);
    if (token) {
      // set token property
      this.token = token;

      // store username and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify({ id: user.id, username: user.name, token: token }));
    }
  }

  public loginFB() {
    let that = this;
    FB.login(function(response) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      that.http.post(AppService.API + "users/facebooklogin",response.authResponse,options)
                    .subscribe((data) => {
                      let response = data.json();
                      let user = new User(response.user.name, response.user.email);
                      let token = response.token;
                      that._login(token, user);
                    });
    },{
      scope: 'email'
    });
  }
}
