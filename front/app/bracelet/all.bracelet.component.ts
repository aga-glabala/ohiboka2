import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BraceletService} from './bracelet.service';
import {BraceletInterface} from './models/bracelet.interface';
declare const DISQUSWIDGETS:any;

@Component({
  selector: 'bracelet-all',
  template: `<h1>Wszystkie bransoletki</h1>
  <div>
    Sortuj po:
    <select (change)="changeSorting($event.target.value)">
      <option value="newest">Najnowsze najpierw</option>
      <option value="oldest">Najstarsze najpierw</option>
    </select>
  </div>
  <bracelet-list [bracelets]="bracelets"></bracelet-list>
  <pagination *ngIf="count" [itemsCount]="count" [itemsForPage]="18" [activePage]="page"
         [url]="generateURL"></pagination>
  `
})
export class BraceletAllComponent implements OnInit {
  constructor(public BraceletService:BraceletService, private route: ActivatedRoute, private router: Router) {
  }
  bracelets : BraceletInterface[] = [];
  count: number;
  commentsLoaded : boolean = false;
  private subParams: any;
  private subQuery: any;
  private params: any;
  private query: any;
  page: number;

  ngOnInit() {
    this.subParams = this.route.params.subscribe(params => {
      this.params = params;
      this.getList();
    });
    this.subQuery = this.route.queryParams.subscribe(query => {
      this.query = query;
      this.getList();
    });
  }

  private getList() {
    if(this.params && this.query) {
      this.page = this.params['page'] ? this.params['page'] : 1;
      this.BraceletService.getList(this.page, 18, this.query.sortby).subscribe(
                         data => {
                           this.count = data.count;
                           this.bracelets = data.bracelets;
                         });
    }
  }

  changeSorting(sortby) {
    this.router.navigate(['/bracelets/all/', 1], {queryParams: { 'sortby': sortby }});
  }

  ngOnDestroy() {
    this.subQuery.unsubscribe();
    this.subParams.unsubscribe();
  }

  generateURL(i) {
    return "/bracelets/all/" + i;
  }
}
