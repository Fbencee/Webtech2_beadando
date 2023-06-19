import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FoodService } from '../services/food.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { FoodDTO } from 'models';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent {
  isNewFood = true;

  foods: FoodDTO[] = [];

  foodForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    name: this.formBuilder.control(''),
    desc: this.formBuilder.control(''),
    preptime: this.formBuilder.control(0),
    price: this.formBuilder.control(0)
  });

  constructor(
    private formBuilder: FormBuilder,
    private foodService: FoodService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isNewFood = false;

      this.foodService.getOne(id).subscribe({
        next: (food) => this.foodForm.setValue(food),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A ételek betöltése sikertelen', 'Hiba');
        }
      });
    }
  }



  saveFood() {
    const food = this.foodForm.value as FoodDTO;

    if (this.isNewFood) {
      this.foodService.create(food).subscribe({
        next: (food) => {
          this.toastrService.success('Az étel sikeresen hozzáadva, id:' + food.id, 'Siker');
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error('Az étel hozzáadása nem sikerült.', 'Hiba');
        }
      });
    }
    else {
      this.foodService.update(food).subscribe({
        next: (food) => {
          this.toastrService.success('Termék sikeresen szerkesztve.' , 'Siker');
        },
        error: (err) => { 
          console.log(err);
          this.toastrService.error('A termék szerkesztése nem sikerült.', 'Hiba');
        }
      });

    }
  }
}
