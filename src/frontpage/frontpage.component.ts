import { Component } from '@angular/core';
import {Case, CaseService} from '../Services/case.service';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

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

  constructor(private caseService: CaseService, private router: Router) {}

  searchCaseById(): void {
    if (!this.searchId) {
      console.error('ID skal udfyldes!');
      return;
    }
    this.router.navigate(['/casesingle', this.searchId]); // Naviger til det nye route
  }
}
