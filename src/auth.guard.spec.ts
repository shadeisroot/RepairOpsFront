import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './Services/auth.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let authServiceMock: Partial<AuthService>;
  let routerMock: Partial<Router>;
  let authGuardInstance: AuthGuard;

  beforeEach(() => {
    authServiceMock = {
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    authGuardInstance = new AuthGuard(TestBed.inject(AuthService), TestBed.inject(Router));
  });

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuardInstance.canActivate(guardParameters[0]));

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
