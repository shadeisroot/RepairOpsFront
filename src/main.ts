import { bootstrapApplication } from '@angular/platform-browser';
import { MatNativeDateModule } from '@angular/material/core';
import {BrowserAnimationsModule, provideAnimations} from '@angular/platform-browser/animations';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import {CaseMakerComponent} from './case-maker/case-maker.component';
import {importProvidersFrom} from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Tilføj HTTP-klient
    importProvidersFrom(BrowserAnimationsModule), // Aktiver Material-animationer
    importProvidersFrom(MatNativeDateModule) // Til Datepicker-funktionalitet
  ],
}).catch((err) => console.error(err));
