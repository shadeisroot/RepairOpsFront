import { bootstrapApplication } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {CaseMakerComponent} from './case-maker/case-maker.component';
import {importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {JwtInterceptor} from './jwt.interceptor';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
