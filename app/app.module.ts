import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AppComponent }   from './app.component';
import { BraceletModule }   from './bracelet/bracelet.module';
import { EditorModule }   from './editor/editor.module';
import { UsersModule }   from './users/users.module';

@NgModule({
  imports: [
    BrowserModule,
    BraceletModule,
    EditorModule,
    UsersModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/bracelets/list',
        pathMatch: 'full'
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
