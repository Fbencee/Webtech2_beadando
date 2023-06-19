import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodFormComponent } from './food-form/food-form.component';

const routes: Routes = [
  { path: 'food-list', component: FoodListComponent },
  { path: 'food-form', component: FoodFormComponent },
  { path: 'food-form/:id',component: FoodFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
