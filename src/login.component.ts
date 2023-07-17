import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'my-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>I am from Login Component</h1>
    <p *ngIf="logginIn">Logging....</p>
    <button (click)="login()">Login</button>
  `,
})
export class LoginComponent {
  logginIn = false;
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  async login() {
    this.logginIn = true;
    let loginSuccess = (await new Promise((res) =>
      setTimeout(() => res(true), 2000)
    )) as boolean;
    this.logginIn = false;
    console.log(loginSuccess);
    let returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    console.log(returnUrl);
    this.router.navigateByUrl(returnUrl);
  }
}
