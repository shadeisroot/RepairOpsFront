import {Component, OnInit} from '@angular/core';
import {Case, CaseService} from '../Services/case.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cases-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cases-list.component.html',
  styleUrl: './cases-list.component.css'
})
export class CasesListComponent implements OnInit{
  cases: Case[] = [];
  statusOptions: string[] = [
    'Modtaget',
    'Under reparation',
    'Afventer dele',
    'Repareret og klar til afhentning'
  ];


  constructor(private caseService: CaseService) {}

  ngOnInit(): void {
    this.loadCases();
  }

  loadCases(): void {
    this.caseService.getAllCases().subscribe({
      next: (cases) => {
        // Tilføj en isEditing egenskab til hver sag
        this.cases = cases.map((caseItem) => ({
          ...caseItem,
          isEditing: false
        }));
      },
      error: (err) => console.error('Fejl ved indlæsning af sager:', err)
    });
  }

  editCase(caseItem: Case): void {
    caseItem.isEditing = true;
  }

  saveCase(caseItem: Case): void {
    // Kun send status
    const updatedCase: Case = {
      ...caseItem,    // Beholder resten af dataene som de er
      status: caseItem.status   // Opdaterer kun status
    };

    this.caseService.updateCase(caseItem.id, updatedCase).subscribe({
      next: (response) => {
        console.log('Sagen blev opdateret:', response);
        caseItem.isEditing = false;
      },
      error: (err) => {
        console.error('Fejl ved opdatering af sag:', err);
      }
    });
  }

  cancelEdit(caseItem: Case): void {
    // Gendan status fra serveren og afslut redigering
    this.loadCases();
    caseItem.isEditing = false;
  }
}
