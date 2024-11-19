import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../Services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: any;
  password: any;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  Loginbuttonclick() {
    this.loginService.login(this.username, this.password).subscribe(
      response => {
        if (response && response.userId) {
          // Store user session directly
          this.successMessage = 'Login successful!';
          this.router.navigate(['/frontpage']);
        } else {
          this.errorMessage = 'Login failed: userId not found';
        }
      },
      error => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}
