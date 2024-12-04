import { Component } from '@angular/core';
import {DatePipe, NgIf, NgStyle} from "@angular/common";
import {Case, CaseService} from '../Services/case.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  //case
  foundCase: Case | null = null;
  //status array
  statuses: string[] = [
    'Modtaget',
    'Under reparation',
    'Afventer dele',
    'Repareret og klar til afhentning'
  ];
  //index nummeret for status
  currentStatusIndex: number = 0;

  caseStatusMessage: string | null = null;

  constructor(private route: ActivatedRoute, private caseService: CaseService, private router: Router) {}

  ngOnInit(): void {
    // henter id fra url
    const id = this.route.snapshot.paramMap.get('id');
    // tjekker om der er et id i url og henter sagen
    if (id) {
      this.selectCase(id);
    }
  }

  // Metode til at hente en sag baseret på ID
  selectCase(id: string): void {
    this.caseService.getCase(id).subscribe({
      // Hvis data hentes korrekt
      next: (data) => {
        this.foundCase = data; // gemmer data for at vise
        this.caseStatusMessage = null; // nulstiller besked
        this.currentStatusIndex = this.statuses.indexOf(data.status); // finder status
      },
      // Hvis der opstår fejl
      error: (err) => {
        if (err.status === 404) {
          console.warn('Sagen blev afsluttet.');
          this.foundCase = null; // nulstiller data
          this.caseStatusMessage = 'Sagen er afsluttet.'; // besked om afsluttet sag
        } else {
          console.error('Fejl ved hentning af sag:', err);
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['frontpage']); // Navigerer til forsiden
  }

}
