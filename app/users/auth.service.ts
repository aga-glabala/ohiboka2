import { Injectable }     from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CookieService } from 'angular2-cookie/core';
import { User } from './user.model';

declare const FB:any;

@Injectable()
export class AuthService {

  private loggedUser : BehaviorSubject<User>;

  constructor (private http: Http, private _cookieService:CookieService) {
    this.loggedUser = new BehaviorSubject(undefined);
  }

  public login(user : User) {
    this.loggedUser.next(user);
  }

  public loginFB(id, name : string, email : string) {
    this.loggedUser.next(new User(name, email));
  }

  public logout() {
    this.loggedUser.next(null);
  }

  public getUser() {
    return this.loggedUser.asObservable();
  }

  public isLoggedUser() {
    if(this.loggedUser.getValue()) return true;
    this.isLoggedFB();
  }

  private isLoggedFB() {
    let that = this;
    FB.getLoginStatus(response => {

      if (response.status === 'connected') {
        FB.api('/me?fields=email,name', function(resp) {
          that.loginFB(resp.id, resp.name, resp.email)
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
  /*getList(page: number = 0, count: number = 10) {
    return this.http.get("http://b.ohiboka.com/mo1062_bracelet/bracelet")
                    .map(this.extractData)
                    .map(this.createFromArray);
  }

  saveBracelet(bracelet: BraceletInterface) {
    console.log(bracelet.toJson());

    let body = JSON.stringify(bracelet.toJson());
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if(bracelet.id) {
      return this.http.put("http://b.ohiboka.com/mo1062_bracelet/bracelet/" + bracelet.id, body, options)
        .map(this.extractData);
    } else {
      return this.http.post("http://b.ohiboka.com/mo1062_bracelet/bracelet", body, options)
        .map(this.extractData);
    }
  }*/
}
