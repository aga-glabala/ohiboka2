import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }   from './app.component';
import { BraceletModule }   from './bracelet/bracelet.module';
import { BraceletListComponent }   from './bracelet/list.bracelet.component';
import { BraceletDetailComponent }   from './bracelet/detail.bracelet.component';
import { EditorModule }   from './editor/editor.module';

@NgModule({
  imports: [
    BrowserModule,
    BraceletModule,
    EditorModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/bracelets/list',
        pathMatch: 'full'
      },{
        path: 'bracelets/list',
        component: BraceletListComponent
      },
      {
        path: 'bracelet-detail',
        component: BraceletDetailComponent
      }
    ])
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    CookieService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
