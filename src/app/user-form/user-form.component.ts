import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserDTO } from 'models';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  isNewUser = true;

  foods: UserDTO[] = [];

  userForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    email: this.formBuilder.control('',[Validators.required, Validators.email]),
    password: this.formBuilder.control('',[Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute) { }

    get fc() {
      return this.userForm.controls;
    }


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isNewUser= false;

      this.userService.getOne(id).subscribe({
        next: (user) => this.userForm.setValue(user),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A felhasználó betöltése sikertelen', 'Hiba');
        }
      });
    }
  }



  saveUser() {
    const user = this.userForm.value as UserDTO;

    if (this.isNewUser) {
      this.userService.create(user).subscribe({
        next: (user) => {
          this.toastrService.success('A felhasználó sikeresen hozzáadva, id:' + user.id, 'Siker');
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error('Az felhasználó hozzáadása nem sikerült.', 'Hiba');
        }
      });
    }
    else {
      this.userService.update(user).subscribe({
        next: (user) => {
          this.toastrService.success('Felhasználó sikeresen szerkesztve.' , 'Siker');
        },
        error: (err) => { 
          console.log(err);
          this.toastrService.error('A felhasználó szerkesztése nem sikerült.', 'Hiba');
        }
      });

    }
  }
}
