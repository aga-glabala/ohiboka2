import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BraceletService} from '../bracelet/bracelet.service';

@Component({
  template: `<editor-bracelet *ngIf="bracelet" [bracelet]="bracelet"></editor-bracelet>
  `
})

export class EditBraceletComponent implements OnInit, OnDestroy {
  id: string;
  private sub: any;
  bracelet;

  constructor(public BraceletService:BraceletService, private route: ActivatedRoute) {}

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
