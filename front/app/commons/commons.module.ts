import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { PaginationComponent }   from './pagination.directive';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule
  ],
  declarations: [
    PaginationComponent,
  ],
  exports: [
    PaginationComponent
  ]
})
export class CommonsModule { }
