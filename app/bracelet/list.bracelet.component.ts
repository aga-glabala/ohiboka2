import { Component, OnInit, AfterViewInit, AfterContentInit} from '@angular/core';
import {BraceletService} from './bracelet.service';
import {BraceletInterface} from './models/bracelet.interface';
declare const DISQUSWIDGETS:any;

@Component({
  selector: 'bracelet-list',
  template: `<h1>Najnowsze</h1>
  <div class="row">
    <div class="col-xs-1 col-md-6 col-lg-4" *ngFor="let bracelet of bracelets">
      <div class="card card-block">
        <a class="card-link" [routerLink]="['/bracelet/detail', bracelet.id]">
          <preview_bracelet class="vertical" [bracelet]="bracelet" [readonly]="true"></preview_bracelet>
          <h4 class="card-title">{{bracelet.name}}</h4>
          <a class="card-link" [routerLink]="['/bracelet/edit', bracelet.id]">Edit</a>
          <span class="disqus-comment-count" [attr.data-disqus-identifier]="'bracelet' + bracelet.id">Komentarze </span>
        </a>
      </div>
    </div>
  </div>`
})
export class BraceletListComponent implements OnInit {
  constructor(public BraceletService:BraceletService) {
  }
  bracelets : BraceletInterface[] = [];
  commentsLoaded : boolean = false;

  ngOnInit() {
    this.BraceletService.getList().subscribe(
                       bracelets => this.bracelets = bracelets);
  }

  ngAfterViewChecked() {
    if(document.getElementsByClassName('disqus-comment-count').length > 0 && !this.commentsLoaded) {
      DISQUSWIDGETS.getCount({reset: true});
      this.commentsLoaded = true;
    }
  }
}
