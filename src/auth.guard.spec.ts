import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let authGuardInstance: AuthGuard;

  beforeEach(() => {
  });

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuardInstance.canActivate(guardParameters[0]));

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
