import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BraceletService } from './bracelet.service';
import { BraceletInterface } from './models/bracelet.interface';
import { User } from '../users/user.model';
import 'rxjs/add/operator/switchMap';
declare const DISQUSWIDGETS:any;

@Component({
  selector: 'users-bracelet',
  template: `<h1 *ngIf="user">Bransoletki użytkownika {{ user.getUsername() }}</h1>
  <div class="filter">
    <span class="filter-label">Sortuj po: </span>
    <span class="btn-group" role="group" aria-label="sort by">
      <a class="btn" [ngClass]="{'btn-default': sortby=='oldest', 'btn-info': sortby=='newest'}" [routerLink]="['/bracelets/all/', 1, {sortby: 'newest'}]">Najnowsze</a>
      <a class="btn" [ngClass]="{'btn-default': sortby=='newest', 'btn-info': sortby=='oldest'}" [routerLink]="['/bracelets/all/', 1, {sortby: 'oldest'}]">Najstarsze</a>
    </span>
  </div>
  <bracelet-list [bracelets]="bracelets"></bracelet-list>
  <pagination *ngIf="count" [itemsCount]="count" [itemsForPage]="18" [activePage]="page"
         [url]="generateURL()"></pagination>
  `
})
export class UsersBraceletComponent implements OnInit {
  constructor(public BraceletService:BraceletService, private route: ActivatedRoute, private router: Router) {
  }
  bracelets : BraceletInterface[] = [];
  count: number;
  page: number;
  sortby: string;
  userId: string;
  user: User;

  ngOnInit() {
    this.route.params.switchMap((params : any) => {
      this.userId = params.userId;
      this.sortby = params.sortby ? params.sortby : "newest";
      this.page = params.page;
      return this.BraceletService.getUsersBracelets(params.userId, params.page, 18, params.sortby)
    }).subscribe(
      data => {
        this.count = data.count;
        this.bracelets = data.bracelets;
        this.user = data.user;
      }
    );
  }

  generateURL() {
    let that = this;
    return function(i) {
      return ["/bracelets/users/", that.userId, i, {sortby: that.sortby}];
    }
  }
}
