import { Component } from '@angular/core';
import {Case, CaseService} from '../Services/case.service';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-frontpage',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    FormsModule
  ],
  templateUrl: './frontpage.component.html',
  styleUrl: './frontpage.component.css'
})
export class FrontpageComponent {
  searchId: string = ''; // ID til søgning
  foundCase: Case | null = null; // Fundet sag
  searchError: string | null = null; // Fejlmeddelelse

  constructor(private caseService: CaseService) {}

  searchCaseById(): void {
    if (!this.searchId) {
      this.searchError = 'Sags-ID skal udfyldes.';
      this.foundCase = null;
      return;
    }

    this.caseService.getCase(this.searchId).subscribe({
      next: (caseItem) => {
        this.foundCase = caseItem; // Gem fundet sag
        this.searchError = null; // Nulstil fejlmeddelelse
      },
      error: (err) => {
        console.error('Fejl ved hentning af sag:', err);
        this.foundCase = null; // Ryd fundet sag
        this.searchError = 'Sagen blev ikke fundet. Tjek ID og prøv igen.';
      }
    });
  }
}
