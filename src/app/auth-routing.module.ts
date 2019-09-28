import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { OktaCallbackComponent } from '@okta/okta-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
// import { AuthInterceptor } from './shared/okta/auth.interceptor';


// import { HomeComponent } from './home/home.component';


// const oktaConfig = {
//   issuer: 'https://dev-892069.okta.com',
//   redirectUri: window.location.origin + '/implicit/callback',
//   clientId: '0oa1bhabb0CprTdyq357'
// };

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    // component: HomeComponent
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home/:slug',
    // component: HomeComponent
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  // {
  //   path: 'implicit/callback',
  //   component: OktaCallbackComponent
  // }
];

@NgModule({
  declarations: [
    // HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // OktaAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    // { provide: OKTA_CONFIG, useValue: oktaConfig },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
