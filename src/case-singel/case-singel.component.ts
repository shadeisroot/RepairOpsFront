import { Component } from '@angular/core';
import {DatePipe, NgIf} from "@angular/common";
import {Case, CaseService} from '../Services/case.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-case-singel',
  standalone: true,
    imports: [
        DatePipe,
        NgIf
    ],
  templateUrl: './case-singel.component.html',
  styleUrl: './case-singel.component.css'
})
export class CaseSingelComponent {
  foundCase: Case | null = null;

  constructor(private route: ActivatedRoute, private caseService: CaseService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Hent ID fra ruten
    if (id) {
      this.caseService.getCase(id).subscribe({
        next: (data) => this.foundCase = data,
        error: (err) => console.error('Fejl ved hentning af sag:', err)
      });
    }
  }

}
