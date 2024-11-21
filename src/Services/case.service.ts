import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Case{
  id: string;
  customerName: string;
  equipmentType: string;
  problemDescription: string;
  creationDate: string;
  expectedDeliveryDate: string;
  priority: string;
  assignedTechnician: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = 'http://localhost:5102/api/case';

  constructor(private http: HttpClient) { }

  //henter alle cases
  getCases(): Observable<Case[]> {
    return this.http.get<Case[]>(this.apiUrl);
  }

  //henter en enkelt sag
  getCase(id: string): Observable<Case> {
    return this.http.get<Case>(`${this.apiUrl}/${id}`);
  }

  //opretter en ny sag
  createCase(newCase: Case): Observable<Case> {
    return this.http.post<Case>(this.apiUrl, newCase);
  }

  //opdater en sag
  updateCase(id: string, updatedCase: Partial<Case>): Observable<Case> {
    return this.http.put<Case>(`${this.apiUrl}/${id}`, updatedCase);
  }

  //slet en sag
  deleteCase(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
