import { Injectable }     from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {BraceletInterface} from './models/bracelet.interface';
import {Bracelet} from './models/bracelet.model';
import {TextBracelet} from './models/text-bracelet.model';
import {AppService} from '../app.service';

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
    return this.http.get(AppService.API + "bracelets/" + id)
                  .map(this.extractData)
                  .map(BraceletService.create);
  }

  getList(page: number = 1, limit: number = 18, sortby: string = "newest") {
    return this.http.get(AppService.API + "bracelets?page=" + page + "&limit="
          + limit + "&sortby=" + sortby)
                    .map(this.extractData)
                    .map(data => {
                      var bracelets = this.createFromArray(data.bracelets);
                      var count = data.count;
                      return {
                        bracelets: bracelets,
                        count: count
                      }
                    });
  }

  saveBracelet(bracelet: BraceletInterface) {
    let body = JSON.stringify(bracelet.toJson());
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    if(bracelet.id) {
      return this.http.put(AppService.API + "bracelets/" + bracelet.id, body, options)
        .map(this.extractData);
    } else {
      return this.http.post(AppService.API + "bracelets", body, options)
        .map(this.extractData);
    }
  }

  deleteBracelet(id: string) {
    return this.http.delete(AppService.API + "bracelets/" + id)
                    .map(this.extractData);
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
