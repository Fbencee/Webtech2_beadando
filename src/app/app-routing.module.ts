import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodFormComponent } from './food-form/food-form.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  { path: 'food-list', component: FoodListComponent },
  { path: 'food-form', component: FoodFormComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] },
  { path: 'food-form/:id',component: FoodFormComponent, canActivate: [ () => inject(AuthService).preventGuestAccess() ] } ,
  { path: 'user-form', component: FoodFormComponent },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
