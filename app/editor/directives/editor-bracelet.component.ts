import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {BraceletService} from '../../bracelet/bracelet.service';

@Component({
  selector: 'editor-bracelet',
  template: `
  <button (click)="bracelet.addFirstString()">dodaj nitkę</button>
  <button (click)="bracelet.removeFirstString()">usuń nitkę</button>
  <button (click)="bracelet.addRowAtBegining()">dodaj wiersz</button>
  <button (click)="bracelet.removeFirstRow()">usuń wiersz</button>
  <button (click)="bracelet.removeLastString()">usuń nitkę</button>
  <button (click)="bracelet.addLastString()">dodaj nitkę</button>

  <div>
    <color-picker *ngFor="let string of bracelet.strings; let i=index" color="{{string}}" (onColorChanged)="colorChanged($event, i)"></color-picker>
  </div>
  <div class="bracelet" [ngClass]="{'text': bracelet.type=='text'}">
    <div *ngFor="let row of bracelet.rows" class="bracelet__row" [ngClass]="{'odd': row.odd}">
      <node *ngFor="let node of row.knots" [node]="node" [readonly]="readonly"></node>
    </div>
  </div>

  <button (click)="bracelet.addRowAtEnd()">dodaj wiersz</button>
  <button (click)="bracelet.removeLastRow()">usuń wiersz</button>

  <div><button (click)="saveBracelet()">Zapisz</button></div>
  `
})

export class EditorBraceletComponent {
  @Input() bracelet;

  constructor(public BraceletService:BraceletService, private router: Router) {
  }

  saveBracelet() {
    this.BraceletService.saveBracelet(this.bracelet).subscribe(data => {
      if(data._id) {
        this.router.navigate(['/bracelet/edit', data._id]);
      }
    });
  }

  colorChanged(color, index) {
    this.bracelet.changeColor(index, color);
  }
}
