import { bootstrapApplication } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import {CaseMakerComponent} from './case-maker/case-maker.component';

bootstrapApplication(AppComponent,  {
  providers: [provideHttpClient()],
} )
  .catch((err) => console.error(err));
