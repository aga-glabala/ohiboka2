import {TextNode, PhantomTextNode, createTextNode} from './text-node.model';
import {TextRow} from './row.model';
import {BraceletInterface} from './bracelet.interface';
import {User} from '../../users/user.model';
import * as moment from 'moment';

export class TextBracelet implements BraceletInterface {
    type: string;
    name: string;
    public: boolean;
    rows: TextRow[];
    strings: string[];
    id: string;
    created: Date;
    author: User;
    private origRows;

    constructor(braceletInfo:any) {
      this.name = braceletInfo.name;
      this.type = braceletInfo.type;
      this.strings = braceletInfo.strings;
      this.id = braceletInfo._id;
      if(braceletInfo.author) {
        this.author = User.createUser({name: braceletInfo.author.name, id: braceletInfo.author.id});
      }
      this.rows = [];

      var row = braceletInfo.rows[0];
      var new_row = [];

      for(var j=0; j<this.strings.length; j++) {
        var tmp_node = createTextNode('phantom', undefined, this.strings[j]);
        new_row.push(tmp_node);
      }
      this.rows.push(new TextRow(new_row, !row.odd));

      var leadString = new_row[0].stringBeforeRight;
      var stringOffset = 1;

      if(!row.odd) {
        leadString = new_row[new_row.length - 1].stringBeforeRight;
        stringOffset = 0;
      }

      for(var i=0; i < braceletInfo.rows.length; i++) {
        var newRow = [];
        var row = braceletInfo.rows[i];
        var prevRow = this.rows[i];

        var tmp_node = createTextNode('phantom', undefined, leadString);
        newRow.push(tmp_node);

        for(var k=0; k<row.knots.length; k++) {
          var node = createTextNode(row.knots[k].type, leadString, this.strings[k + stringOffset]);
          newRow.push(node);
        }

        tmp_node = createTextNode('phantom', leadString, undefined);
        newRow.push(tmp_node);

        this.rows.push(new TextRow(newRow, row.odd));
      }
  }

  getTime() {
    return moment(this.created).fromNow()
  }

  addRowAtBegining() {
    let row = this.rows[2];
    let knots: TextNode[] = [];

    for(let i = 0; i < row.knots.length; i++) {
      if(row.knots[i].isPhantom()) {
        knots.push(createTextNode('phantom', row.knots[i].leadString, row.knots[i].baseString));
      } else {
        knots.push(createTextNode('horizontal', row.knots[i].leadString, row.knots[i].baseString));
      }
    }

    let firstRow : TextRow = this.rows[0];
    firstRow.odd = !firstRow.odd;

    if(!firstRow.odd) {
      this.strings = [this.strings[this.strings.length - 1], ...this.strings.splice(0, this.strings.length - 1)];
      firstRow.knots = [firstRow.knots[firstRow.knots.length - 1], ...firstRow.knots.splice(0, firstRow.knots.length - 1)];
    } else {
      this.strings = [...this.strings.splice(1), this.strings[0]];
      firstRow.knots = [...firstRow.knots.splice(1), firstRow.knots[0]];
    }

    this.rows = [firstRow, new TextRow(knots, row.odd), ...this.rows.splice(1)];
  }

  addRowAtEnd() {
    var row = this.rows[this.rows.length - 1];
    var knots: TextNode[] = [];

    for(var i = 0; i < row.knots.length; i++) {
      if(row.knots[i].isPhantom()) {
        knots.push(createTextNode('phantom', row.knots[i].leadString, row.knots[i].baseString));
      } else {
        knots.push(createTextNode('horizontal', row.knots[i].leadString, row.knots[i].baseString));
      }
    }

    this.rows.push(new TextRow(knots, !row.odd));
  }

  removeFirstRow() {
    if(this.rows.length < 4) {
      return false;
    }

    var firstRow = this.rows[0];
    if(firstRow.odd) {
      this.strings = [this.strings[this.strings.length - 1], ...this.strings.splice(0, this.strings.length - 1)];
      firstRow.knots = [firstRow.knots[firstRow.knots.length - 1], ...firstRow.knots.splice(0, firstRow.knots.length - 1)];
    } else {
      this.strings = [...this.strings.splice(1), this.strings[0]];
      firstRow.knots = [...firstRow.knots.splice(1), firstRow.knots[0]];
    }

    firstRow.odd = !firstRow.odd;

    this.rows = [firstRow, ...this.rows.splice(2)];

    return true;
  }

  removeLastRow() {
    if(this.rows.length < 4) {
      return false;
    }

    this.rows = this.rows.splice(0, this.rows.length - 1);

    return true;
  }

  addFirstString() {
    var color = '#ff0000';
    var leadColor = '';

    if(this.rows[0].odd) {
      this.strings = [color, ...this.strings];
      leadColor = this.strings[this.strings.length-1];

      this.rows[0].knots = [
        createTextNode('phantom', undefined, color),
        ...this.rows[0].knots
      ];
    } else {
      this.strings = [this.strings[0], color, ...this.strings.splice(1)];
      leadColor = this.strings[0];

      this.rows[0].knots = [
        this.rows[0].knots[0],
        createTextNode('phantom', undefined, color),
        ...this.rows[0].knots.splice(1)];
    }

    for(var i = 1; i < this.rows.length; i++) {
      this.rows[i].knots = [
        this.rows[i].knots[0],
        createTextNode('horizontal', leadColor, color),
        ...this.rows[i].knots.splice(1)];
    }
  }

  addLastString() {
    var color = '#ff0000';
    var leadColor = '';

    if(this.rows[0].odd) {
      leadColor = this.strings[this.strings.length-1];
      this.strings = [
        ...this.strings.splice(0, this.strings.length - 1),
        color,
        this.strings[this.strings.length - 1]
      ];

      this.rows[0].knots = [
        ...this.rows[0].knots.splice(0, this.rows[0].knots.length - 1),
        createTextNode('phantom', undefined, color),
        this.rows[0].knots[this.rows[0].knots.length - 1]
      ];
    } else {
      leadColor = this.strings[0];
      this.strings = [...this.strings, color];

      this.rows[0].knots = [
        ...this.rows[0].knots,
        createTextNode('phantom', undefined, color)
      ];
    }

    for(var i = 1; i < this.rows.length; i++) {
      this.rows[i].knots = [
        ...this.rows[i].knots.splice(0, this.rows[i].knots.length-1),
        createTextNode('horizontal', leadColor, color),
        this.rows[i].knots[this.rows[i].knots.length-1]
      ];
    }
  }

  removeFirstString() {
    if(this.strings.length < 4) {
      return false;
    }

    if(this.rows[0].odd) {
      this.strings = this.strings.splice(1);
      this.rows[0].knots = this.rows[0].knots.splice(1);
    } else {
      this.strings = [this.strings[0], ...this.strings.splice(2)];
      this.rows[0].knots = [
        this.rows[0].knots[0],
        ...this.rows[0].knots.splice(2)];
    }

    for(var i = 1; i < this.rows.length; i++) {
      this.rows[i].knots = [
        this.rows[i].knots[0],
        ...this.rows[i].knots.splice(2)];
    }

    return true;
  }

  removeLastString() {
    if(this.strings.length < 4) {
      return false;
    }

    if(this.rows[0].odd) {
      this.strings = [
        ...this.strings.splice(0, this.strings.length - 2),
        this.strings[this.strings.length - 1]
      ];

      this.rows[0].knots = [
        ...this.rows[0].knots.splice(0, this.rows[0].knots.length - 2),
        this.rows[0].knots[this.rows[0].knots.length - 1]
      ];
    } else {
      this.strings = this.strings.splice(0, this.strings.length - 1);
      this.rows[0].knots = this.rows[0].knots.splice(0, this.rows[0].knots.length - 1);
    }

    for(var i = 1; i < this.rows.length; i++) {
      this.rows[i].knots = [
        ...this.rows[i].knots.splice(0, this.rows[i].knots.length-2),
        this.rows[i].knots[this.rows[i].knots.length-1]
      ];
    }

    return true;
  }

    public changeColor(index : number, color : string) {
      this.strings[index] = color;

      if(index === 0 && !this.rows[0].odd || index === this.strings.length - 1 && this.rows[0].odd) {
        for(var i = 0; i < this.rows.length; i++) {
          let row = this.rows[i];

          row.knots[0] = createTextNode('phantom', undefined, color);
          for(var j = 1; j < row.knots.length - 1; j++) {
            let knot = row.knots[j];

            knot.leadString = color;
            knot.update();
          }
          row.knots[row.knots.length - 1] = createTextNode('phantom', color, undefined);
        }
      } else {
        let isFirstRowOdd = this.rows[0].odd;
        for(var i = 0; i < this.rows.length; i++) {
          let knot = this.rows[i].knots[index];
          if(!this.rows[i].knots[1].isPhantom() && isFirstRowOdd) {
            knot = this.rows[i].knots[index + 1];
          }
          knot.baseString = color;
          knot.update();
        }
      }
    }

    toJson() {
      let data = {
        _id: this.id,
        strings: this.strings,
        rows: [],
        type: "text",
        name: this.name,
        public: this.public ? true : false
      };

      for(var i=1; i < this.rows.length; i++) {
        data.rows[i-1] = this.rows[i].toJson();
      }

      return data;
    }

    public getColors() : string[] {
      var u = {};
      var colors : string[] = [];
      for(var i = 0; i < this.strings.length; ++i){
         if(u.hasOwnProperty(this.strings[i])) {
            continue;
         }
         colors.push(this.strings[i]);
         u[this.strings[i]] = 1;
      }
      return colors;
    }

    public getStringsNumber() : number {
      return this.strings.length;
    }

    public getColorsNumber() : number {
      return this.getColors().length;
    }

    isTextType() : boolean {
      return true;
    }

    getLongerBracelet(rows: number) {
      return this;
    }
}
