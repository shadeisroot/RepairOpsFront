import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string }>('/api/login', credentials).subscribe({
      next: (response) => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        this.router.navigate(['/protected-page']);
      },
      error: (err) => console.error('Login failed', err),
    });
  }
}
