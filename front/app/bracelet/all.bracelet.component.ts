import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BraceletService } from './bracelet.service';
import { BraceletInterface } from './models/bracelet.interface';
import { Observable } from 'rxjs';
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
  page: number;

  ngOnInit() {
    Observable.zip(this.route.params, this.route.queryParams).switchMap(params => {
      return this.BraceletService.getList(params.page, 18, params.sortby)
    }).subscribe(
       data => {
         this.count = data.count;
         this.bracelets = data.bracelets;
       }
     );
  }

  changeSorting(sortby) {
    this.router.navigate(['/bracelets/all/', 1], {queryParams: { 'sortby': sortby }});
  }

  generateURL(i) {
    return "/bracelets/all/" + i;
  }
}
