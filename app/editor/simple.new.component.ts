import {Component} from '@angular/core';
import { BraceletInterface } from '../bracelet/models/bracelet.interface';
import {BraceletService} from '../bracelet/bracelet.service';

@Component({
  template: `
  <editor-bracelet [bracelet]="bracelet"></editor-bracelet>
  `
})
export class NewSimpleBraceletComponent {
  constructor(public BraceletService:BraceletService) {
  }
  bracelet : BraceletInterface;

  ngOnInit() {
    this.bracelet = BraceletService.create({
      type: "standard",
      strings: ['#ff0000', '#00ff00', '#ff00ff', '#ff0000', '#00ffff', '#ffff00', '#0000ff', '#ffff00', '#0000ff'],
      rows: [
        {
          odd: false,
          knots: [
          {type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'}
        ]},{
          odd: true,
          knots: [
          {type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'}
        ]},{
          odd: false,
          knots: [
          {type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'}
        ]},{
          odd: true,
          knots: [
          {type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'}
        ]},{
          odd: false,
          knots: [
          {type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'}
        ]},{
          odd: true,
          knots: [
          {type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'}
        ]},{
          odd: false,
          knots: [
          {type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'},{type: 'right-regular'}
        ]
      }]
    });
  }
}
