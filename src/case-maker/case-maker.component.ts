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
  //array til at gemme cases
  cases: Case[] = [];
  //variable til at gemme en enkelt case
  selectedCase: Case | null = null;

  //form data til oprettelse/redigering af case
  caseData: Partial<Case> = {
    customerName: '',
    equipmentType: '',
    problemDescription: '',
    creationDate: '',
    expectedDeliveryDate: '',
    priority: 'Lav',
    assignedTechnician: '',
    status: 'Modtaget'
  };
  //formatere dagen i dag til string
  currentDate: string = new Date().toISOString();
  //holder styr på index af den aktuelle status
  currentStatusIndex: number = 0;

  //Hard code liste til de teknikere man kan vælge
  //Dette skal ændres når man kan oprette sig som tekniker
  teknikere: string[] = ['Tekniker A', 'Tekniker B', 'Tekniker C'];
  //Hard code liste af status
  statuses: string[] = [
    'Modtaget',
    'Under reparation',
    'Afventer dele',
    'Repareret og klar til afhentning'
  ];

  constructor(private caseService: CaseService) {}


  ngOnInit() {
    this.loadCases(); //henter allerede oprettet cases fra server
    this.caseData.creationDate = this.currentDate; //sætter oprettelses dato
  }

  // Hent alle sager
  loadCases() {
    this.caseService.getCases().subscribe({
      next: (data) => this.cases = data, //opdatere case med data fra server
      error: (err) => console.error('Fejl ved hentning af sager', err) //fejlhåndtering
    });
  }

  // Hent en specifik sag ud fra id
  selectCase(id: string) {
    this.caseService.getCase(id).subscribe({
      next: (data) => {
        this.selectedCase = data; //opdatere valgte case med data fra server
        this.currentStatusIndex = this.statuses.indexOf(data.status); //sætter status index
      },
      error: (err) => console.error('Fejl ved hentning af sag', err) //fejlhåndtering
    });
  }

  // Opdater status på den valgte sag
  updateStatus(index: number) {
    if (this.selectedCase) {
      this.currentStatusIndex = index; //opdatere status index
      this.selectedCase.status = this.statuses[index]; //opdatere status for den valgte case

      this.caseService.updateCase(this.selectedCase.id, this.selectedCase).subscribe({
        next: () => console.log('Status opdateret'), //logger succes
        error: (err) => console.error('Fejl ved opdatering af status', err) //fejlhåndtering
      });
    }
  }

  // Opret en ny sag
  onSubmit() {
    //validrer felter
    if (!this.caseData.customerName || !this.caseData.equipmentType) {
      console.error('Kundeoplysninger og udstyrstype skal udfyldes!');
      return;
    }
    //samler data for en ny case
    const newCase: Partial<Case> = {
      customerName: this.caseData.customerName!,
      equipmentType: this.caseData.equipmentType!,
      problemDescription: this.caseData.problemDescription!,
      creationDate: this.caseData.creationDate ? new Date(this.caseData.creationDate).toISOString() : new Date().toISOString(),
      expectedDeliveryDate: this.caseData.expectedDeliveryDate ? new Date(this.caseData.expectedDeliveryDate).toISOString() : '',
      priority: this.caseData.priority!,
      assignedTechnician: this.caseData.assignedTechnician!,
      status: this.caseData.status!
    };

    console.log('New case data:', newCase); //logger data (brugt til debug)
    //sender den nye case til server
    this.caseService.createCase(newCase as Case).subscribe({
      next: (data) => {
        console.log('Ny sag oprettet', data); //logger succes
        this.loadCases(); //genindlaeser listen over cases
        this.resetForm(); //nulstiller formularen
      },
      error: (err) => {
        console.error('Fejl ved oprettelse af sag', err); //fejlhåndtering
      }
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
      priority: 'Lav',
      assignedTechnician: '',
      status: 'Modtaget'
    };
    this.currentStatusIndex = 0;
  }
}
