import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from './users/auth.service';
import * as moment from 'moment';
// FIXME import 'momentLocale';

declare const FB:any;
@Component({
  selector: 'my-app',
  template: `
  <header>
    <div class="container">
      <div class="row">
        <h1 class="col-md-5"><span class="sr-only">Ohiboka</span></h1>
        <nav class="col-md-7 text-right">
          <a [routerLink]="['/bracelet/new']">New bracelet</a>
          <a [routerLink]="['/bracelets/index']">Bracelets</a>
          <a *ngIf="!userLogged" [routerLink]="['/user/login']">Zaloguj się</a>
          <a *ngIf="userLogged" (click)="logout()">
            Wyloguj się
            <span class="user-icon ion-ios-person"></span>
          </a>
        </nav>
      </div>
    </div>
  </header>
  <div class="container">
    <router-outlet></router-outlet>
  </div>`
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  userLogged;
  private sub: any;
  constructor(public AuthService : AuthService) {
  }

  logout() {
    this.AuthService.logout();
  }

  ngOnInit() {
    moment.locale('pl');

    FB.init({
        appId      : '371302376535518',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        status     : true,
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use graph api version 2.5
    });



    this.AuthService.verifyUser().subscribe(user => {
       // todo : obsługa błędów
     });

     this.AuthService.getUser().subscribe(user => {
       this.userLogged = user;
     });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
