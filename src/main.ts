import { bootstrapApplication } from '@angular/platform-browser';
import { CaseMakerComponent } from './app/case-maker/case-maker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(CaseMakerComponent, {
  providers: [
    provideAnimations(), // For animationer i Angular Material
    MatNativeDateModule  // For datoformatering og understøttelse af datovælger
  ]
}).catch(err => console.error(err));
