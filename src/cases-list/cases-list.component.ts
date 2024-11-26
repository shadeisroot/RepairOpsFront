import {Component, OnInit} from '@angular/core';
import {Case, CaseService} from '../Services/case.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cases-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cases-list.component.html',
  styleUrl: './cases-list.component.css'
})
export class CasesListComponent implements OnInit{
  cases: Case[] = [];

  constructor(private caseService: CaseService) {}

  ngOnInit(): void {
    this.caseService.getAllCases().subscribe({
      next: (data) => (this.cases = data),
      error: (err) => (this.cases = err),
    });
  }
}
