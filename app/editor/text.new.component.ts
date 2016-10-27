import {Component} from '@angular/core';
import {BraceletService} from '../bracelet/bracelet.service';

@Component({
  template: `
  <editor-bracelet [bracelet]="bracelet"></editor-bracelet>
  `
})
export class NewTextBraceletComponent {
  constructor(public BraceletService:BraceletService) {
  }

  bracelet = {rows: []};

  ngOnInit() {
    this.bracelet = BraceletService.create({
      type: "text",
      strings: ['#000000', '#00ff00', '#ff00ff', '#ff0000', '#00ffff', '#ffff00', '#0000ff', '#ffff00', '#0000ff'],
      rows: [
        {
          odd: true,
          knots: [
          {type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'}
        ]},{
          odd: false,
          knots: [
          {type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'}
        ]},{
          odd: true,
          knots: [
          {type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'}
        ]},{
          odd: false,
          knots: [
          {type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'}
        ]},{
          odd: true,
          knots: [
          {type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'}
        ]},{
          odd: false,
          knots: [
          {type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'}
        ]},{
          odd: true,
          knots: [
          {type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'}
        ]},{
          odd: false,
          knots: [
          {type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'},{type: 'horizontal'}
        ]
      }]
    });
  }
}
