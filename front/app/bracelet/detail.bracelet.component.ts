import {Component, Inject, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BraceletService} from '../bracelet/bracelet.service';
import {BraceletInterface} from '../bracelet/models/bracelet.interface';
import { AuthService } from '../users/auth.service';
import * as moment from 'moment';

declare const DISQUSWIDGETS:any;

@Component({
  selector: 'bracelet-detail',
  template: `<div *ngIf="bracelet">
    <h2>{{ bracelet.name }}</h2>
    <div class="row">
      <div class="col-md-8">
        <preview_bracelet [bracelet]="bracelet"></preview_bracelet>
        <bracelet [bracelet]="bracelet" [ngClass]="{'text': bracelet.isTextType()}"></bracelet>
      </div>
      <div class="col-md-4 author">
        <div class="row"><a href="#todo">
          <div class="col-md-4 icon"><span class="glyphicon glyphicon-user"></span></div>
          <div class="col-md-8 username-container">
            <p class="username">{{bracelet.author.getUsername()}}</p>
            <p>Zobacz wszystkie bransoletki tego autora</p>
          </div>
        </a></div>
      </div>
      <div class="col-md-4 details">
        <h3>Szczegóły</h3>
        <div>Liczba nitek: <strong>{{ bracelet.getStringsNumber() }}</strong></div>
        <div>Liczba kolorów: <strong>{{ bracelet.getColorsNumber() }}</strong></div>
        <div>Data dodania: <strong>{{ getTime() }}</strong></div>
        <div>Komentarzy: <span class="disqus-comment-count" [attr.data-disqus-identifier]="'bracelet' + bracelet.id"></span></div>
        <div *ngIf="user && user.id == bracelet.author.id"><a (click)="delete()">Usuń</a></div>
      </div>
      <div class="col-xs-12">
        <disqus id="disqus_thread" braceletName="{{bracelet.name}}" braceletId="{{bracelet.id}}"></disqus>
      </div>
    </div>
  </div>`
})
export class BraceletDetailComponent implements OnInit, OnDestroy {
  id: string;
  private sub: any;
  bracelet : BraceletInterface;
  commentsLoaded : boolean = false;
  user;

  constructor(public BraceletService:BraceletService, private route: ActivatedRoute, private router: Router, private AuthService: AuthService) {

  }

  delete() {
    this.sub = this.route.params.subscribe(params => {
       let id = params['id'];
       this.BraceletService.deleteBracelet(id).subscribe(
                            response => {
                              if(response.status) {
                                this.router.navigate(['/bracelets/list']);
                              }
                            });
     });
  }

  getTime() {
    return moment(this.bracelet.created).fromNow()
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       let id = params['id'];
       this.BraceletService.getBracelet(id).subscribe(
                            bracelet => this.bracelet = bracelet);
     });
    this.AuthService.getUser().subscribe(user => {
       this.user = user;
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngAfterViewChecked() {
    if(document.getElementsByClassName('disqus-comment-count').length > 0 && !this.commentsLoaded) {
      DISQUSWIDGETS.getCount({reset: true});
      this.commentsLoaded = true;
    }
  }
}
