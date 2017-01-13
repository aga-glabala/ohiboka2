import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthService } from './users/auth.service';
declare const FB:any;
@Component({
  selector: 'my-app',
  template: `
  <header>
    <div class="container">
      <div class="row">
        <h1 class="col-md-5"><span class="sr-only">Ohiboka</span></h1>
        <nav class="col-md-7 text-md-right">
          <a [routerLink]="['/bracelet/new']">New bracelet</a>
          <a [routerLink]="['/bracelets/list']">Bracelets</a>
          <a *ngIf="!userLogged" [routerLink]="['/user/login']">Zaloguj się</a>
          <a *ngIf="userLogged" (click)="logout()">Wyloguj się</a>
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
    FB.logout();
    this.AuthService.logout();
  }

  ngOnInit() {
    FB.init({
        appId      : '371302376535518',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        status     : true,
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.5' // use graph api version 2.5
    });



    this.AuthService.isLoggedUser();

    this.sub = this.AuthService.getUser().subscribe(user => {
       this.userLogged = user;
     });
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
