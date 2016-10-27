import { Component } from '@angular/core';
import {BraceletService} from './bracelet.service';
import {BraceletInterface} from './models/bracelet.interface';


@Component({
  selector: 'bracelet-list',
  template: `<h1>Lista</h1>
  <div class="row">
    <div class="col-xs-1 col-md-6 col-lg-4" *ngFor="let bracelet of bracelets">
      <div class="card card-block">
        <preview_bracelet [bracelet]="bracelet" [readonly]="true"></preview_bracelet>
        <h4 class="card-title">TODO name</h4>
        <a class="card-link" [routerLink]="['/bracelet/edit', bracelet.id]">Edit</a>
        <a class="card-link" [routerLink]="['/bracelet', bracelet.id]">Show</a>
      </div>
    </div>
  </div>`
})
export class BraceletListComponent {
  constructor(public BraceletService:BraceletService) {
  }
  bracelets : BraceletInterface[] = [];

  ngOnInit() {
    this.BraceletService.getList().subscribe(
                       bracelets => this.bracelets = bracelets);
  }
}
