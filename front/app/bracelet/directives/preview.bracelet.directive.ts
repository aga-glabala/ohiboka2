import {Component, Input} from '@angular/core';

@Component({
  selector: 'preview_bracelet',
  template: `
    <div class="shadow shadow--before"></div> 
    <div class="preview-container" [ngClass]="{'text': bracelet.isTextType(), 'standard': !bracelet.isTextType()}">
      <div *ngFor="let row of innerBracelet.rows" class="bracelet__row" [ngClass]="{'odd': row.odd}">
        <node *ngFor="let node of row.knots.slice().reverse()" [node]="node" [readonly]="true"></node>
      </div>
    </div>
    <div class="shadow shadow--after"></div>
  `
})
export class PreviewBraceletComponent {
  @Input() bracelet;
  @Input() readonly;
  @Input() rows;

  innerBracelet;

  ngOnInit() {
    if(this.rows && this.rows > 0) {
      this.innerBracelet = this.bracelet.getLongerBracelet(this.rows);
    } else {
      this.innerBracelet = this.bracelet;
    }
  }
}
