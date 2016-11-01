import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BraceletService} from '../bracelet/bracelet.service';
import {BraceletInterface} from '../bracelet/models/bracelet.interface';

@Component({
  selector: 'bracelet-detail',
  template: `<h3>Bransoletka</h3>
  <div *ngIf="bracelet">
  <preview_bracelet [bracelet]="bracelet"></preview_bracelet>
  <bracelet [bracelet]="bracelet" [ngClass]="{'text': bracelet.isTextType()}"></bracelet>
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
