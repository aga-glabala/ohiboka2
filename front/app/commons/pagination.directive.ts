import { Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'pagination',
  template: `<nav aria-label="Page navigation">
  <ul class="pagination">
    <li>
      <a [routerLink]="url(activePage - 1)" aria-label="Previous" *ngIf="activePage > 1">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li *ngFor="let page of pages; let i = index" [ngClass]="{'active': i+1 == activePage}">
    <a [routerLink]="url(i + 1)">{{ i + 1 }}</a></li>
    <li>
      <a [routerLink]="url(-(-activePage) + 1)" aria-label="Next" *ngIf="activePage < pages.length">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
  </nav>`
})
export class PaginationComponent {
  @Input() activePage;
  @Input() itemsCount;
  @Input() itemsForPage;
  @Input() url;
  pages: number[];
  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.pages = new Array(Math.ceil(this.itemsCount / this.itemsForPage));
  }

  ngOnDestroy() {
  }
}
