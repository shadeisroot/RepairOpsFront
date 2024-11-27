import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginService} from './Services/login.service';
import {AuthService} from "./Services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private loginservice: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.loginservice.getToken();
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
