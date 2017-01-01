import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import { BraceletDetailComponent }   from './detail.bracelet.component';
import { BraceletListComponent }   from './list.bracelet.component';
import { BraceletService }   from './bracelet.service';
import { NodeComponent } from './directives/node.directive';
import { PreviewBraceletComponent }   from './directives/preview.bracelet.directive';
import { BraceletComponent } from './directives/bracelet.directive';
import { DisqusComponent } from './directives/disqus.directive';
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'bracelets/list',
        component: BraceletListComponent
      },
      {
        path: 'bracelet/detail/:id',
        component: BraceletDetailComponent
      }
    ]),
    HttpModule
  ],
  declarations: [
    BraceletListComponent,
    BraceletDetailComponent,
    BraceletComponent,
    PreviewBraceletComponent,
    DisqusComponent,
    NodeComponent
  ],
  exports: [
    NodeComponent
  ],
  providers: [
    BraceletService
  ]
  //bootstrap:    [ BraceletComponent ]
})
export class BraceletModule { }
