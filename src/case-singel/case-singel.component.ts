import { Component } from '@angular/core';
import {DatePipe, NgIf, NgStyle} from "@angular/common";
import {Case, CaseService} from '../Services/case.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-case-singel',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgStyle
  ],
  templateUrl: './case-singel.component.html',
  styleUrl: './case-singel.component.css'
})
export class CaseSingelComponent {
  foundCase: Case | null = null;

  statuses: string[] = [
    'Modtaget',
    'Under reparation',
    'Afventer dele',
    'Repareret og klar til afhentning'
  ];
  currentStatusIndex: number = 0;

  constructor(private route: ActivatedRoute, private caseService: CaseService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.caseService.getCase(id).subscribe({
        next: (data) => {
          this.foundCase = data;
          this.currentStatusIndex = this.statuses.indexOf(data.status);
        },
        error: (err) => console.error('Fejl ved hentning af sag:', err)
      });
    }
  }

}
