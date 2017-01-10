import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { CookieService } from 'angular2-cookie/services/cookies.service';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild([
      {path: 'user/login',  component: LoginComponent}
    ])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    CookieService,
    AuthService
  ]
})
export class UsersModule { }
