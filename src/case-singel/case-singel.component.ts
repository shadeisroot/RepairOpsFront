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

  constructor(private route: ActivatedRoute, private caseService: CaseService) {}

  ngOnInit(): void {
    //henter id fra url
    const id = this.route.snapshot.paramMap.get('id');
    //tjekker om der er et id i url
    if (id) {
      this.caseService.getCase(id).subscribe({
        //hvis data hentes, sker dette
        next: (data) => {
          //gemmer data i foundcase for at vise dem
          this.foundCase = data;
          //finder status indeks i statuts array
          this.currentStatusIndex = this.statuses.indexOf(data.status);
        },
        //error
        error: (err) => console.error('Fejl ved hentning af sag:', err)
      });
    }
  }

}
