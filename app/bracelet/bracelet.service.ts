import { Injectable }     from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {BraceletInterface} from './models/bracelet.interface';
import {Bracelet} from './models/bracelet.model';
import {TextBracelet} from './models/text-bracelet.model';

@Injectable()
export class BraceletService {
  constructor (private http: Http) {}


  // Uses the Bracelet model to create a new Bracelet
  static create(braceletInfo:any) : BraceletInterface {
    if(braceletInfo.type == 'text') {
      return new TextBracelet(braceletInfo);
    } else {
      return new Bracelet(braceletInfo);
    }
  }

  getEmptyBracelet() {
    return new Bracelet({rows:[], strings: [], type: 'standard'});
  }

  createFromArray(braceletArray : any[]) {
    return braceletArray.map(BraceletService.create);
  }

  getBracelet(id: string) {
    return this.http.get("http://b.ohiboka.com/mo1062_bracelet/bracelet/" + id)
                  .map(this.extractData)
                  .map(BraceletService.create);
  }

  getList(page: number = 0, count: number = 10) {
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
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || [];
  }

  getDict(number) {
    return this.http.get("http://localhost:3000/assets/dicts/" + number + ".json")
      .map(function(res: Response) {
        return res.json();
      });
  }
}
