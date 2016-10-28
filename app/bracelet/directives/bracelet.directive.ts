import {Component, Input} from '@angular/core';

@Component({
  selector: 'bracelet',
  template: `
  <div *ngFor="let row of bracelet.rows" class="bracelet__row" [ngClass]="{'odd': row.odd}">
    <node *ngFor="let node of row.knots" [node]="node" [readonly]="readonly"></node>
  </div>
  `
})
export class BraceletComponent {
  @Input() bracelet;
  @Input() readonly;

  submit() {
    this.bracelet.save();
  }
}
