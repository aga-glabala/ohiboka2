import { Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {BraceletService} from './bracelet.service';
import {BraceletInterface} from './models/bracelet.interface';
declare const DISQUSWIDGETS:any;

@Component({
  selector: 'bracelet-index',
  template: `<h1>Najnowsze</h1>
  <bracelet-list [bracelets]="bracelets"></bracelet-list>
  <div class="text-right">
  <a [routerLink]="['/bracelets/all', 1]" class="btn btn-primary">Zobacz wszystkie</a>
  </div>
  `
})
export class BraceletIndexComponent implements OnInit {
  constructor(public BraceletService:BraceletService) {
  }
  bracelets : BraceletInterface[] = [];
  commentsLoaded : boolean = false;
  count : number;

  ngOnInit() {
    this.BraceletService.getList(1, 6).subscribe(
                       data => {
                         this.count = data.count;
                         this.bracelets = data.bracelets;
                       });
  }
}
