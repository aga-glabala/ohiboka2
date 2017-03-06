import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import { CommonsModule }   from '../commons/commons.module';

import { BraceletDetailComponent }   from './detail.bracelet.component';
import { BraceletIndexComponent }   from './index.bracelet.component';
import { BraceletListComponent }   from './directives/list.bracelet.component';
import { BraceletAllComponent }   from './all.bracelet.component';
import { BraceletService }   from './bracelet.service';
import { NodeComponent } from './directives/node.directive';
import { PreviewBraceletComponent }   from './directives/preview.bracelet.directive';
import { BraceletComponent } from './directives/bracelet.directive';
import { DisqusComponent } from './directives/disqus.directive';
import { UsersBraceletComponent } from './users-bracelet.bracelet.component';
import { DisqusModule } from 'angular2-disqus';
@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'bracelets/index',
        component: BraceletIndexComponent
      },
      {
        path: 'bracelets/all/:page',
        component: BraceletAllComponent
      },
      {
        path: 'bracelet/detail/:id',
        component: BraceletDetailComponent
      },
      {
        path: 'bracelets/user/:userId/:page',
        component: UsersBraceletComponent
      }
    ]),
    HttpModule,
    DisqusModule,
    CommonsModule
  ],
  declarations: [
    BraceletIndexComponent,
    BraceletDetailComponent,
    BraceletListComponent,
    BraceletAllComponent,
    BraceletComponent,
    UsersBraceletComponent,
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
