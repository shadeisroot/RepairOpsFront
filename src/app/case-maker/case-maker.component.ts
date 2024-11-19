import { Component } from '@angular/core';
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

@Component({
  selector: 'app-case-maker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,  // Dropdown-menu
    MatDatepickerModule, // Kalenderen
    MatNativeDateModule
  ],
  templateUrl: './case-maker.component.html',
  styleUrl: './case-maker.component.css'
})
export class CaseMakerComponent {
  statuses = [
    'Modtaget',
    'Under reparation',
    'Afventer dele',
    'Repareret og klar til afhentning'
  ];

  currentStatusIndex: number = 0;

  updateStatus(index: number) {
    if (index >= 0 && index < this.statuses.length) {
      this.currentStatusIndex = index;
    }
  }

  // Auto-genereret oprettelsesdato
  currentDate: string = new Date().toISOString().slice(0, 16).replace('T', ' ');

  // Placeholder data for teknikere
  teknikere: string[] = ['Tekniker 1', 'Tekniker 2', 'Tekniker 3'];

  onSubmit() {
    console.log('Formular indsendt!');
  }


}
