import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BraceletService} from './bracelet.service';
import {BraceletInterface} from './models/bracelet.interface';
declare const DISQUSWIDGETS:any;

@Component({
  selector: 'bracelet-all',
  template: `<h1>Wszystkie bransoletki</h1>
  <bracelet-list [bracelets]="bracelets"></bracelet-list>
  <pagination [itemsCount]="127" [itemsForPage]="18" [activePage]="page"></pagination>
  `
})
export class BraceletAllComponent implements OnInit {
  constructor(public BraceletService:BraceletService, private route: ActivatedRoute) {
  }
  bracelets : BraceletInterface[] = [];
  count: number;
  commentsLoaded : boolean = false;
  private sub: any;
  page: number;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.page = params['page'] ? params['page'] : 1;
       this.BraceletService.getList(this.page).subscribe(
                          data => {
                            this.count = data.count;
                            this.bracelets = data.bracelets;
                          });
     });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
