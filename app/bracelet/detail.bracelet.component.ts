import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BraceletService} from '../bracelet/bracelet.service';
import {BraceletInterface} from '../bracelet/models/bracelet.interface';

@Component({
  selector: 'bracelet-detail',
  template: `<div *ngIf="bracelet">
    <h2>{{ bracelet.name }}</h2>
    <div class="row">
      <div class="col-md-8">
        <preview_bracelet [bracelet]="bracelet"></preview_bracelet>
        <bracelet [bracelet]="bracelet" [ngClass]="{'text': bracelet.isTextType()}"></bracelet>
      </div>
      <div class="col-md-4 details">
        <h3>Szczegóły</h3>
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
