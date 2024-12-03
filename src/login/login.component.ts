import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {LoginService} from '../Services/login.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

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
  successMessage = '';
  errorMessage = '';
  private subscriptions: Subscription[] = [];

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.subscriptions.push(
      this.loginService.successMessage$.subscribe(message => this.successMessage = message),
      this.loginService.errorMessage$.subscribe(message => this.errorMessage = message)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  Loginbuttonclick() {
    this.loginService.login(this.credentials);
  }
}
