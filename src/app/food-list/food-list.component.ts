import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { FoodDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  foods: FoodDTO[]= [];

  constructor(
    private foodService: FoodService,
    private toastrSevice: ToastrService,
    private router :Router,
    public authService: AuthService,) { }

 ngOnInit(): void {
  this.foodService.getAll().subscribe({
    next: (foods) => {
      this.foods = foods;
      console.log(foods);
    },
    error: (err) => console.error(err)  
  })
 }

 navigateToProductForm(id : number) {
  this.router.navigate(['/food-form', id]);
}

 deleteProduct(food: FoodDTO) {
  this.foodService.delete(food.id).subscribe({
    next: () => {
      const index = this.foods.indexOf(food);
      if (index > -1) {
        this.foods.splice(index, 1);
      }
    },
    error: (err) => {
      console.error(err);
      this.toastrSevice.error('Hiba az étel törlésekor.', 'Hiba');
    }
  })
}
}
