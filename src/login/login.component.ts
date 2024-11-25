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
  credentials = {username: '', password: ''};

  constructor(private loginService: LoginService, private router: Router) {}

  Loginbuttonclick() {
    this.loginService.login(this.credentials);
  }
}
