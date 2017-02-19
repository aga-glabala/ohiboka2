import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BraceletService } from './bracelet.service';
import { BraceletInterface } from './models/bracelet.interface';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
declare const DISQUSWIDGETS:any;

@Component({
  selector: 'bracelet-all',
  template: `<h1>Wszystkie bransoletki</h1>
  <div class="filter">
    <span class="filter-label">Sortuj po: </span>
    <span class="btn-group" role="group" aria-label="sort by">
      <a class="btn" [ngClass]="{'btn-default': sortby=='oldest', 'btn-info': sortby=='newest'}" [routerLink]="['/bracelets/all/', 1, {sortby: 'newest'}]">Najnowsze</a>
      <a class="btn" [ngClass]="{'btn-default': sortby=='newest', 'btn-info': sortby=='oldest'}" [routerLink]="['/bracelets/all/', 1, {sortby: 'oldest'}]">Najstarsze</a>
    </span>
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
  sortby: string;

  ngOnInit() {
    this.route.params.switchMap((params : any) => {
      this.sortby = params.sortby;
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
