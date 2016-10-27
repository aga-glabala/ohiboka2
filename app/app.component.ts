import { Component } from '@angular/core';
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
        </nav>
      </div>
    </div>
  </header>
  <div class="container">
    <router-outlet></router-outlet>
  </div>`
})
export class AppComponent { }
