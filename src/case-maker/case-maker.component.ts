import {Component, OnInit} from '@angular/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {Case, CaseService} from '../Services/case.service';

@Component({
  selector: 'app-case-maker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './case-maker.component.html',
  styleUrl: './case-maker.component.css'
})
export class CaseMakerComponent implements OnInit{
  cases: Case[] = [];
  selectedCase: Case | null = null;

  caseData: Partial<Case> = {
    customerName: '',
    equipmentType: '',
    problemDescription: '',
    creationDate: '',
    expectedDeliveryDate: '',
    priority: 'low',
    assignedTechnician: '',
    status: 'Modtaget'
  };

  currentDate: string = new Date().toISOString();

  currentStatusIndex: number = 0;

  teknikere: string[] = ['Tekniker A', 'Tekniker B', 'Tekniker C'];
  statuses: string[] = [
    'Modtaget',
    'Under reparation',
    'Afventer dele',
    'Repareret og klar til afhentning'
  ];

  constructor(private caseService: CaseService) {}

  ngOnInit() {
    this.loadCases();
    this.caseData.creationDate = this.currentDate;
  }

  // Hent alle sager
  loadCases() {
    this.caseService.getCases().subscribe({
      next: (data) => this.cases = data,
      error: (err) => console.error('Fejl ved hentning af sager', err)
    });
  }

  // Hent en specifik sag
  selectCase(id: string) {
    this.caseService.getCase(id).subscribe({
      next: (data) => {
        this.selectedCase = data;
        this.currentStatusIndex = this.statuses.indexOf(data.status);
      },
      error: (err) => console.error('Fejl ved hentning af sag', err)
    });
  }

  // Opdater status på den valgte sag
  updateStatus(index: number) {
    if (this.selectedCase) {
      this.currentStatusIndex = index;
      this.selectedCase.status = this.statuses[index];

      this.caseService.updateCase(this.selectedCase.id, this.selectedCase).subscribe({
        next: () => console.log('Status opdateret'),
        error: (err) => console.error('Fejl ved opdatering af status', err)
      });
    }
  }

  // Opret en ny sag
  onSubmit() {
    if (!this.caseData.customerName || !this.caseData.equipmentType) {
      console.error('Kundeoplysninger og udstyrstype skal udfyldes!');
      return;
    }

    const newCase: Case = {
      id: '',
      customerName: this.caseData.customerName!,
      equipmentType: this.caseData.equipmentType!,
      problemDescription: this.caseData.problemDescription!,
      creationDate: this.currentDate,
      expectedDeliveryDate: this.caseData.expectedDeliveryDate!,
      priority: this.caseData.priority!,
      assignedTechnician: this.caseData.assignedTechnician!,
      status: this.caseData.status!
    };

    this.caseService.createCase(newCase).subscribe({
      next: (data) => {
        console.log('Ny sag oprettet', data);
        this.loadCases();
        this.resetForm();
      },
      error: (err) => console.error('Fejl ved oprettelse af sag', err)
    });
  }

  // Reset form data efter oprettelse
  resetForm() {
    this.caseData = {
      customerName: '',
      equipmentType: '',
      problemDescription: '',
      creationDate: this.currentDate,
      expectedDeliveryDate: '',
      priority: 'low',
      assignedTechnician: '',
      status: 'Modtaget'
    };
    this.currentStatusIndex = 0;
  }
}
