import {Component} from '@angular/core';
import {BraceletService} from '../bracelet/bracelet.service';

@Component({
  template: `
  <editor-bracelet [bracelet]="bracelet"></editor-bracelet>
  `
})
export class NewZigzakBraceletComponent {
  constructor(public BraceletService:BraceletService) {
  }

  bracelet = {rows: []};

  ngOnInit() {
    this.bracelet = BraceletService.create({
      type: "standard",
      strings: ['#ff0000', '#00ff00', '#ff00ff', '#ff0000', '#00ffff', '#ffff00', '#0000ff', '#ffff00', '#0000ff'],
      rows: [
        {
          odd: false,
          knots: [
          {type: 'left-backward'},{type: 'left-backward'},{type: 'left-backward'},{type: 'left-backward'}
        ]},{
          odd: true,
          knots: [
          {type: 'right-backward'},{type: 'right-backward'},{type: 'right-backward'},{type: 'right-backward'}
        ]},
        {
          odd: false,
          knots: [
          {type: 'left-backward'},{type: 'left-backward'},{type: 'left-backward'},{type: 'left-backward'}
        ]},{
          odd: true,
          knots: [
          {type: 'right-backward'},{type: 'right-backward'},{type: 'right-backward'},{type: 'right-backward'}
        ]},
        {
          odd: false,
          knots: [
          {type: 'left-backward'},{type: 'left-backward'},{type: 'left-backward'},{type: 'left-backward'}
        ]},{
          odd: true,
          knots: [
          {type: 'right-backward'},{type: 'right-backward'},{type: 'right-backward'},{type: 'right-backward'}
        ]}]
    });
  }
}
