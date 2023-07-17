import 'zone.js/dist/zone';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  provideRouter,
  Router,
  RouterModule,
  RouterOutlet,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { LoginComponent } from './login.component';
import { BarFirstComponent } from './barfirst.component';
import { BarSecondComponent } from './barsecond.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [
    CommonModule,
    BarFirstComponent,
    BarSecondComponent,
    LoginComponent,
    RouterModule,
  ],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
    <br>
    <a routerLink="/foo/bar">Navigate to BAR</a>
    <br>
    <a routerLink="/foo/bar/bar1">Navigate to BAR1</a>
    <br>
    <a routerLink="/foo/bar/bar2">Navigate to BAR2</a>
    <br>
    <a routerLink="/foo/bar/bar3">Navigate to BAR3</a>
    <br>
    <a routerLink="/">Navigate to HOME</a>
    <router-outlet></router-outlet>
  `,
})
export class App {
  name = 'Angular';
}

const canActivateBar: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let router = inject(Router);
  let promise = new Promise((res) =>
    setTimeout(() => res(Math.floor(Math.random() * 100)), 1000)
  );
  let resolved = (await promise) as number;
  console.log('Promise Resolved', resolved);
  if (resolved < 50) {
    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  }
  return resolved >= 50;
};

export const ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'foo/bar',
    children: [
      {
        path: 'bar1',
        component: BarFirstComponent,
      },
      {
        path: 'bar2',
        component: BarSecondComponent,
      },
      {
        path: '',
        redirectTo: 'bar2',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'bar1',
      },
    ],
    canActivate: [canActivateBar],
  },
];

bootstrapApplication(App, {
  providers: [provideRouter(ROUTES)],
});
