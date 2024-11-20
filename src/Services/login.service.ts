import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly baseUrl: string = 'http://localhost:5102/api'

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(`${this.baseUrl}/User/LoginUser`, null, {params});
  }
}
