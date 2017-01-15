import { Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {BraceletService} from './bracelet.service';
import {BraceletInterface} from './models/bracelet.interface';
declare const DISQUSWIDGETS:any;

@Component({
  selector: 'bracelet-index',
  template: `<h1>Najnowsze</h1>
  <bracelet-list [bracelets]="bracelets"></bracelet-list>
  `
})
export class BraceletIndexComponent implements OnInit {
  constructor(public BraceletService:BraceletService) {
  }
  bracelets : BraceletInterface[] = [];
  commentsLoaded : boolean = false;
  count : number; 

  ngOnInit() {
    this.BraceletService.getList().subscribe(
                       data => {
                         this.count = data.count;
                         this.bracelets = data.bracelets;
                       });
  }
}
