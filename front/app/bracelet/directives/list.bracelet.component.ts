import { Component, AfterViewInit, AfterContentInit, Input} from '@angular/core';
declare const DISQUSWIDGETS:any;

@Component({
  selector: 'bracelet-list',
  template: `
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
export class BraceletListComponent {
  @Input() bracelets;
  constructor() {
  }
  commentsLoaded : boolean = false;

  ngAfterViewChecked() {
    if(document.getElementsByClassName('disqus-comment-count').length > 0 && !this.commentsLoaded) {
      DISQUSWIDGETS.getCount({reset: true});
      this.commentsLoaded = true;
    }
  }
}
