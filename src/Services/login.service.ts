import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {routes} from '../app/app.routes';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly TOKEN_KEY = 'auth_token';

  readonly baseUrl: string = 'http://localhost:5102/api'

  constructor(private http: HttpClient , private router: Router) {
  }


  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string }>(this.baseUrl + '/User/LoginUser', credentials).subscribe({
      next: (response) => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.router.navigate(['/case']);
      },
      error: (err) => console.error('Login failed', err),
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
