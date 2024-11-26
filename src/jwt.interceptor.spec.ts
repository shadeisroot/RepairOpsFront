import { TestBed } from '@angular/core/testing';
import {HttpInterceptorFn, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';

describe('jwtInterceptor', () => {
  let authServiceMock: Partial<AuthService>;
  let interceptorInstance: JwtInterceptor;

  beforeEach(() => {
    authServiceMock = {
      getToken: jasmine.createSpy('getToken').and.returnValue('mock-token')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    });

    interceptorInstance = new JwtInterceptor(TestBed.inject(AuthService));
  });

  const interceptor: (req: HttpRequest<any>, next: HttpHandler) => Observable<HttpEvent<any>> = (req: HttpRequest<any>, next: HttpHandler) =>
    TestBed.runInInjectionContext(() => interceptorInstance.intercept(req, next));

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
