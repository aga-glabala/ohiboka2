import {Component, Input} from '@angular/core';

@Component({
  template: `
  <nav>
    <a [routerLink]="['/bracelet/new/simple']">Nowa prosta bransoletka</a>
    <a [routerLink]="['/bracelet/new/zigzak']">Nowa zygzakowa bransoletka</a>
    <a [routerLink]="['/bracelet/new/generator']">Generator tekstu</a>
    <a [routerLink]="['/bracelet/new/text']">Nowa tekstowa bransoletka</a>
  </nav>
  `
})
export class NewComponent {
}
