import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from "./registration/registration.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {SellComponent} from "./sell/sell.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sell',
    component: SellComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
