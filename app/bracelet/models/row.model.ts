import {StandardNode} from './standard-node.model';
import {TextNode} from './text-node.model';

export interface Row {
  toJson() : {};
}

export class StandardRow implements Row {
  constructor(public knots:StandardNode[], public odd:boolean) {}

  toJson() {
    let data = {
      knots: [],
      odd: this.odd
    };

    let count = 0;
    for(var i=0; i < this.knots.length; i++) {
      if(!this.knots[i].isPhantom()) {
        data.knots[count] = {type: this.knots[i].name};
        count++;
      }
    }

    return data;
  }
}

export class TextRow implements Row {
  constructor(public knots:TextNode[], public odd:boolean) {}

  toJson() {
    let data = {
      knots: [],
      odd: this.odd
    };

    let count = 0;
    for(var i=0; i < this.knots.length; i++) {
      if(!this.knots[i].isPhantom()) {
        data.knots[count] = {type: this.knots[i].name};
        count++;
      }
    }

    return data;
  }
}
