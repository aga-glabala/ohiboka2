import { Injectable }     from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { CookieService } from 'angular2-cookie/core';
import { User } from './user.model';

@Injectable()
export class AuthService {
  constructor (private http: Http, private _cookieService:CookieService) {}

  private loggedUser : User;

  public login(user : User) {
    this.loggedUser = user;
  }

  public loginFB(id, name : string, email : string) {
    this.loggedUser = new User(name, email);
  }

  public logout() {
    this.loggedUser = null;
  }

  public getUser() {
    return this.loggedUser;
  }

  public isLoggedUser() {
    return this.loggedUser ? true : false;
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
