import {StandardNode, PhantomNode, createNode} from './standard-node.model';
import {StandardRow} from './row.model';
import {BraceletInterface} from './bracelet.interface';

export class Bracelet implements BraceletInterface {
    name: string;
    type: string;
    rows: StandardRow[];
    strings: string[];
    id: string;

    constructor(braceletInfo:any) {
        this.name = braceletInfo.name;
        this.strings = braceletInfo.strings;
        this.id = braceletInfo._id;
        this.type = braceletInfo.type;
        this.rows = [];

        var row = braceletInfo.rows[0];
        var new_row = [];

        var odd = row.odd ? 0 : -1;
        var extra = odd && this.strings.length/2 % 2 == 0 ? 1 : 0;

        for(var j=0; j<this.strings.length/2 + extra; j++) {
          var tmp_node = createNode('phantom', undefined, undefined);
          PhantomNode.innerConstructorPhantom(tmp_node, this.strings[2*j + odd], this.strings[2*j + odd + 1]);
          new_row.push(tmp_node);
        }
        this.rows.push(new StandardRow(new_row, !row.odd));

        for(var i=0; i < braceletInfo.rows.length; i++) {
          var prevRow = this.rows[i];
          var newRow = [];
          var row = braceletInfo.rows[i];
          var odd = row.odd ? 1 : 0;
          if(odd) {
            var tmp_node = createNode('phantom', undefined, prevRow.knots[0]);
            PhantomNode.innerConstructorPhantom(tmp_node, undefined, prevRow.knots[0].stringAfterLeft);
            newRow.push(tmp_node);
          }

          for(var k=0; k<row.knots.length; k++) {
            var node = createNode(row.knots[k].type, prevRow.knots[k], prevRow.knots[k + 1]);
            newRow.push(node);
          }

          if(!odd && this.strings.length % 2 > 0 || odd && this.strings.length % 2 == 0) {
            var tmp_node = createNode('phantom', prevRow.knots[prevRow.knots.length - 1], undefined);
            PhantomNode.innerConstructorPhantom(tmp_node, prevRow.knots[prevRow.knots.length - 1].stringAfterRight, undefined);

            newRow.push(tmp_node);
          }
          this.rows.push(new StandardRow(newRow, row.odd));
        }
    }

    addRowAtBegining() {
      var row = this.rows[0];
      var secondRow = this.rows[2];
      var knot: StandardNode;
      var knots = [];

      row = this.shiftPhantomRow(row);

      var type = 'left-backward';
      if(row.odd) {
        type = 'right-backward';
      }

      var howManyKnots = 0;
      for(var i = 0; i < secondRow.knots.length; i++) {
        if(!secondRow.knots[i].isPhantom()) {
          howManyKnots++;
        }
      }

      if(secondRow.knots[0].isPhantom()) {
        knot = createNode('phantom', undefined, undefined);
        PhantomNode.innerConstructorPhantom(knot, undefined, row.knots[0].stringAfterLeft);
        this.rows[1].knots[0].setParentLeft(knot);
        knots.push(knot);
      }

      for(var i = 0; i < howManyKnots; i++) {
        knot = createNode(type, row.knots[i], row.knots[i + 1]);
        knot.childLeft = this.rows[1].knots[i];
        knot.childRight = this.rows[1].knots[i + 1];
        knots.push(knot);
      }

      if(secondRow.knots[secondRow.knots.length - 1].isPhantom()) {
        knot = createNode('phantom', row.knots[row.knots.length - 1], undefined);
        PhantomNode.innerConstructorPhantom(knot, row.knots[row.knots.length - 1].stringAfterRight, undefined);

        knots.push(knot);
      }

      this.rows = [row, new StandardRow(knots, !row.odd), ...this.rows.splice(1)];
    }

    addRowAtEnd() {
      var row = this.rows[this.rows.length - 2];
      var lastRow = this.rows[this.rows.length - 1];

      var knots = [];
      var phantomFirst = 0;

      var type = 'left-backward';
      if(row.odd) {
        type = 'right-backward';
      }

      if(row.knots[0].isPhantom()) {
        var knot = createNode('phantom', undefined, lastRow.knots[0]);
        PhantomNode.innerConstructorPhantom(knot, undefined, lastRow.knots[0].stringAfterLeft);

        knots.push(knot);
        phantomFirst = 1;
      }

      for(var i = 0; i < row.knots.length; i++) {
        if(!row.knots[i].isPhantom()) {
          knots.push(createNode(type, lastRow.knots[i - phantomFirst], lastRow.knots[i + 1 - phantomFirst]))
        }
      }

      if(row.knots[row.knots.length - 1].isPhantom()) {
        var knot = createNode('phantom', undefined, undefined);
        PhantomNode.innerConstructorPhantom(knot, lastRow.knots[lastRow.knots.length - 1].stringAfterRight, undefined);

        knots.push(knot);
      }

      this.rows.push(new StandardRow(knots, row.odd));
    }

    removeFirstRow() {
      if(this.rows.length < 4) {
        return false;
      }

      var phantomRow =  this.rows[0].knots;
      var newFirstRow = this.rows[2].knots;

      this.strings = [];

      for(var i = 0; i < newFirstRow.length; i++) {
        phantomRow[i].stringBeforeLeft = newFirstRow[i].stringBeforeLeft;
        phantomRow[i].stringBeforeRight = newFirstRow[i].stringBeforeRight;
        phantomRow[i].stringAfterLeft = newFirstRow[i].stringBeforeLeft;
        phantomRow[i].stringAfterRight = newFirstRow[i].stringBeforeRight;

        if(newFirstRow[i].stringBeforeLeft) {
          this.strings.push(newFirstRow[i].stringBeforeLeft)
        }
        if(newFirstRow[i].stringBeforeRight) {
          this.strings.push(newFirstRow[i].stringBeforeRight)
        }
      }

      var row = this.shiftPhantomRow(this.rows[0]);

      if(row.odd) {
        for(var i = 0; i < this.rows[2].knots.length; i++) {
          this.rows[2].knots[i].setParentLeft(row.knots[i]);
          this.rows[2].knots[i].setParentRight(row.knots[i + 1]);
        }
      } else {
        for(var i = 0; i < this.rows[2].knots.length; i++) {
          if(i > 0) {
            this.rows[2].knots[i].setParentLeft(row.knots[i - 1]);
          }
          this.rows[2].knots[i].setParentRight(row.knots[i]);
        }
      }

      this.rows = [row, ...this.rows.splice(2)];

      return true;
    }

    removeLastRow() {
      if(this.rows.length < 4) {
        return false;
      }

      this.rows = this.rows.splice(0, this.rows.length - 1);

      var knots = this.rows[this.rows.length - 1].knots;
      for(var i = 0; i < knots.length; i++) {
        knots[i].childLeft = undefined;
        knots[i].childRight = undefined;
      }

      return true;
    }

    addFirstString() {
      var color = '#ff0000';

      if(this.rows[0].knots[0].stringBeforeLeft) {
        var knot = createNode('phantom', undefined, undefined);
        PhantomNode.innerConstructorPhantom(knot, undefined, color);

        this.rows[0].knots = [knot, ...this.rows[0].knots];
      } else {
        this.rows[0].knots[0].stringBeforeLeft = color;
        this.rows[0].knots[0].stringAfterLeft = color;
      }
      this.rows[0].odd = !this.rows[0].odd;

      for(var i = 1; i < this.rows.length; i++) {
        var firstKnot = this.rows[i].knots[0];
        if(firstKnot.isPhantom()) {
          var tmp_node = createNode('left-backward', this.rows[i - 1].knots[0], this.rows[i - 1].knots[1]);
          this.rows[i].knots[0] = tmp_node;

          if(this.rows[i + 1]){
            this.rows[i + 1].knots[0].setParentLeft(tmp_node);
          }
        } else {
          var knot = createNode('phantom', undefined, this.rows[i - 1].knots[0]);
          PhantomNode.innerConstructorPhantom(knot, undefined, this.rows[i - 1].knots[0].stringAfterLeft);

          this.rows[i].knots = [knot, ...this.rows[i].knots];
        }
        this.rows[i].odd = !this.rows[i].odd;
      }

      this.strings = [color, ...this.strings];
      this.rows[0].knots[0].update();
    }

    addLastString() {
      var color = '#ff0000';

      if(this.rows[0].knots[this.rows[0].knots.length - 1].stringBeforeRight) {
        var knot = createNode('phantom', undefined, undefined);
        PhantomNode.innerConstructorPhantom(knot, color, undefined);

        this.rows[0].knots.push(knot);
      } else {
        this.rows[0].knots[this.rows[0].knots.length - 1].stringBeforeRight = color;
        this.rows[0].knots[this.rows[0].knots.length - 1].stringAfterRight = color;
      }

      for(var i = 1; i < this.rows.length; i++) {
        var lastKnot = this.rows[i].knots[this.rows[i].knots.length - 1];
        if(lastKnot.isPhantom()) {
          var knot = createNode('left-backward', this.rows[i - 1].knots[this.rows[i - 1].knots.length - 2], this.rows[i - 1].knots[this.rows[i - 1].knots.length - 1]);
          this.rows[i].knots[this.rows[i].knots.length - 1] = knot;

          if(this.rows[i + 1]) {
            this.rows[i + 1].knots[this.rows[i + 1].knots.length - 1].setParentRight(knot);
          }
        } else {
          var knot = createNode('phantom', this.rows[i - 1].knots[this.rows[i - 1].knots.length - 1], undefined);
          PhantomNode.innerConstructorPhantom(knot, this.rows[i - 1].knots[this.rows[i - 1].knots.length - 1].stringAfterRight, undefined);

          this.rows[i].knots.push(knot);
        }
      }

      this.strings.push(color);
      this.rows[0].knots[this.rows[0].knots.length - 1].update();
    }

    removeFirstString() {
      if(this.strings.length < 4) {
        return false;
      }

      for(var i = 0; i < this.rows.length; i++) {
        var firstKnot = this.rows[i].knots[0];
        if(firstKnot.stringBeforeLeft && firstKnot.isPhantom()) {
          firstKnot.stringBeforeLeft = undefined;
        } else if(firstKnot.isPhantom()) {
          this.rows[i].knots = this.rows[i].knots.splice(1);
        } else {
          var knot = createNode('phantom', undefined, firstKnot.parentRight);
          if(this.rows[i + 1]) {
            this.rows[i + 1].knots[1].setParentLeft(knot);
          }
          this.rows[i].knots[0] = knot;
        }

        this.rows[i].odd = !this.rows[i].odd;
      }

      this.strings = this.strings.splice(1);
      this.rows[0].knots[0].update();
      console.log(this);
      return true;
    }

    removeLastString() {
      if(this.strings.length < 4) {
        return false;
      }

      for(var i = 0; i < this.rows.length; i++) {
        var lastKnot = this.rows[i].knots[this.rows[i].knots.length - 1];
        if(lastKnot.stringBeforeRight && lastKnot.isPhantom()) {
          lastKnot.stringBeforeRight = undefined;
          lastKnot.stringAfterRight = undefined;
        } else if(lastKnot.isPhantom()) {
          this.rows[i].knots = this.rows[i].knots.splice(0, this.rows[i].knots.length - 1);
        } else {
          var knot = createNode('phantom', lastKnot.parentLeft, undefined);
          PhantomNode.innerConstructorPhantom(knot, lastKnot.stringBeforeLeft, undefined);

          this.rows[i].knots[this.rows[i].knots.length - 1] = knot;
        }
      }

      this.strings = this.strings.splice(0, this.strings.length - 1);
      this.rows[0].knots[this.rows[0].knots.length - 1].update();

      return true;
    }

    // change phantom row from odd to even or from even to odd
    private shiftPhantomRow(row:StandardRow) {
      var phantomRow = [];

      var index = 0;
      if(row.knots[0].stringBeforeLeft) {
        var knot = createNode('phantom', undefined, undefined);
        PhantomNode.innerConstructorPhantom(knot, undefined, row.knots[0].stringBeforeLeft);

        phantomRow.push(knot);
        index = 1;
      }
      for(var i = index; i < row.knots.length + 1; i++) {
        if((row.knots[i - index] && row.knots[i - index].stringBeforeRight) || (row.knots[i+1 - index] && row.knots[i+1 - index].stringBeforeLeft)) {

          var knot = createNode('phantom', undefined, undefined);
          PhantomNode.innerConstructorPhantom(knot, row.knots[i - index].stringBeforeRight, row.knots[i+1 - index] ? row.knots[i+1 - index].stringBeforeLeft : undefined);

          phantomRow.push(knot);
        }
      }

      return new StandardRow(phantomRow, !row.odd);
    }

    public changeColor(index : number, color : string) {
      this.strings[index] = color;
      if(this.rows[0].odd) {
        var knot : StandardNode = this.rows[0].knots[Math.floor((index + 1) / 2)];
        if(index % 2 === 0) {
          knot.stringBeforeRight = color;
        } else {
          knot.stringBeforeLeft = color;
        }
        knot.update();
      }
    }

    public toJson() {
      let data = {
        _id: this.id,
        strings: this.strings,
        type: "standard",
        rows: []
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
  }
