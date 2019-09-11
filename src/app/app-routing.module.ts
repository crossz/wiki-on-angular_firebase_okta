import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  {
    path: 'edit/:slug',
    component: EditComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'edit',
    component: EditComponent,
    canActivate: [OktaAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
