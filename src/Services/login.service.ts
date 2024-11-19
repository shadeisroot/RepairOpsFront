import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly baseUrl: string = 'http://localhost:5101/api'

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(`${this.baseUrl}/User/LoginUser`, null, {params});
  }
}
