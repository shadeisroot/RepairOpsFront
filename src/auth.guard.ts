import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {LoginService} from './Services/login.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginservice: LoginService, private router: Router) {}

  canActivate(p0: unknown): boolean {
    if (this.loginservice.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
