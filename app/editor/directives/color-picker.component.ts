import {Component, Input, Output, ElementRef, EventEmitter} from '@angular/core';
import {CookieService} from 'angular2-cookie/core';

@Component({
  host: {'(document:click)': 'toggle($event)'},
  selector: 'color-picker',
  template: `
  <button [style.backgroundColor]="color"></button>
  <div [style.display]="visible ? 'block' : 'none'" class="palette">
    <p>Ostatnio wybierane kolory:</p>
    <div>
      <button *ngFor="let color of lastColors" [style.backgroundColor]="color" (click)="colorChanged(color)" ></button>
    </div>
    <p>Popularne kolory:</p>
    <div>
      <button *ngFor="let color of popularColors" [style.backgroundColor]="color" (click)="colorChanged(color)" ></button>
    </div>
    <p>Inny:</p>
    <input [value]="color" (input)="colorChanged($event.target.value)" type="text">
  </div>
  `
})

export class ColorPickerComponent {
  @Input() color;
  @Output() onColorChanged = new EventEmitter<string>();
  visible = false;

  lastColors : string[] = [];
  popularColors : string[] = [];

  constructor(public element: ElementRef, private _cookieService:CookieService) {
    this.popularColors = [
      "#FAFAFA", "#C8E6C9", "#FFF9C4", "#FFEBEE", "#F8BBD0", "#D1C4E9", "#B3E5FC", "#B2EBF2", "#B2DFDB", "#D7CCC8",
      "#EEEEEE", "#A5D6A7", "#FFF59D", "#EF9A9A", "#F48FB1", "#B39DDB", "#4FC3F7", "#80DEEA", "#80CBC4", "#BCAAA4",
      "#BDBDBD", "#66BB6A", "#FFEE58", "#EF5350", "#F06292", "#9575CD", "#03A9F4", "#00BCD4", "#26A69A", "#A1887F",
      "#757575", "#43A047", "#FDD835", "#E53935", "#E91E63", "#7E57C2", "#0288D1", "#0097A7", "#009688", "#795548",
      "#424242", "#2E7D32", "#F9A825", "#C62828", "#AD1457", "#673AB7", "#0277BD", "#00838F", "#00796B", "#5D4037",
      "#212121", "#1B5E20", "#F57F17", "#B71C1C", "#880E4F", "#311B92", "#01579B", "#006064", "#004D40", "#3E2723"
    ]
  }

  colorChanged(color) {
    let lastColors : string[] = <string[]>this._cookieService.getObject('lastColors') || [];

    let index = lastColors.indexOf(color);
    if(index > -1) {
      lastColors.splice(index, 1);
      lastColors = [color, ...lastColors];
    } else {
      lastColors = [color, ...lastColors];

      if(lastColors.length > 10) {
        lastColors = lastColors.slice(0, 10);
      }
    }

    this.lastColors = lastColors;
    this._cookieService.putObject('lastColors', this.lastColors);
    this.onColorChanged.emit(color);
  }

  toggle(event) {
    if (event.target.parentElement !== this.element.nativeElement) {
      this.visible = false;
    } else {
      this.visible = !this.visible;
    }

    if(this.visible) {
      // TODO pobieranie kolorów przy każdym pokazywaniu / zamienić na jakiś serwis
      this.lastColors = <string[]>this._cookieService.getObject('lastColors') || [];
    }
  }
}
