import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'beadando-app';

  public isLoggedIn = false;


  constructor(
    private router: Router,
    public authService: AuthService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/');
    this.toastrService.success('Sikeresen kijelentkezett.', 'Kilépés');
  }
}

