import {Component, Input} from '@angular/core';

@Component({
  selector: 'preview_bracelet',
  template: `
    <div [ngClass]="{'text': bracelet.isTextType(), 'standard': !bracelet.isTextType()}">
      <div *ngFor="let row of bracelet.rows" class="bracelet__row" [ngClass]="{'odd': row.odd}">
        <node *ngFor="let node of row.knots.slice().reverse()" [node]="node" [readonly]="true"></node>
      </div>
    </div>
  `
})
export class PreviewBraceletComponent {
  @Input() bracelet;
  @Input() readonly;
}
