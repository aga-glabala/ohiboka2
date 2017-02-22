import { Component, AfterViewInit, AfterContentInit, Input} from '@angular/core';
import { AuthService } from '../../users/auth.service';
declare const DISQUSWIDGETS:any;

@Component({
  selector: 'bracelet-list',
  template: `
  <div class="row">
    <div class="col-xs-1 col-md-6 col-lg-4" *ngFor="let bracelet of bracelets">
      <div class="card card-block">
        <a [routerLink]="['/bracelet/detail', bracelet.id]" class="card-container">
          <h4 class="card-title">{{bracelet.name}}</h4>
          <preview_bracelet class="vertical card-content" [bracelet]="bracelet" [readonly]="true" rows="40"></preview_bracelet>
          <div class="card-details">
            <div><span class="icon ion-ios-person-outline"></span><span class="author" >{{bracelet.author.getUsername()}}</span></div>
            <div>
              <span class="icon ion-ios-chatboxes-outline"></span>
              <span class="disqus-comment-count" [attr.data-disqus-identifier]="'bracelet' + bracelet.id">...</span>
              <span class="icon ion-ios-clock-outline"></span>
              <span>{{ bracelet.getTime() }}</span>
              <span class="icon ion-levels"></span>
              <span>{{ bracelet.getStringsNumber() }}</span>
              <span></span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>`
})
export class BraceletListComponent {
  @Input() bracelets;
  user;
  constructor(private AuthService: AuthService) {
  }
  commentsLoaded : boolean = false;

  ngAfterViewChecked() {
    if(document.getElementsByClassName('disqus-comment-count').length > 0 && !this.commentsLoaded) {
      DISQUSWIDGETS.getCount({reset: true});
      this.commentsLoaded = true;
    }
  }

  ngOnInit() {
    this.AuthService.getUser().subscribe(user => {
       this.user = user;
     });
  }
}
