import {Component, Inject, OnInit, OnDestroy, AfterContentInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BraceletService} from '../bracelet/bracelet.service';
import {BraceletInterface} from '../bracelet/models/bracelet.interface';
declare const DISQUS:any;

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
            <p class="username">User name</p>
            <p>Zobacz wszystkie bransoletki tego autora</p>
          </div>
        </a></div>
      </div>
      <div class="col-md-4 details">
        <h3>Szczegóły</h3>
        <div>Liczba nitek: <strong>{{ bracelet.getStringsNumber() }}</strong></div>
        <div>Liczba kolorów: <strong>{{ bracelet.getColorsNumber() }}</strong></div>
        <div>Data dodania: <strong>todo</strong></div>
      </div>
      <div class="col-xs-12">
        <disqus id="disqus_thread"></disqus>
      </div>
    </div>
  </div>`
})
export class BraceletDetailComponent implements OnInit, OnDestroy {
  id: string;
  private sub: any;
  bracelet : BraceletInterface;

  constructor(public BraceletService:BraceletService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       let id = params['id']; // (+) converts string 'id' to a number
       this.BraceletService.getBracelet(id).subscribe(
                            bracelet => this.bracelet = bracelet);
     });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
