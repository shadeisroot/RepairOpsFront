import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Chat} from './chat.service';

//interface som definerer strukturen for en case
export interface Case{
  id: string;
  customerName: string;
  equipmentType: string;
  problemDescription: string;
  creationDate: string;
  expectedDeliveryDate: string | null;
  priority: string;
  assignedTechnician: string;
  status: string;
  isEditing?: boolean;
  mail: string;
  chatMessages: Chat[];
}

export interface User {
  id: number;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = 'http://localhost:5102/api/case'; //base URL fra vores api(for case)
  readonly baseUrl: string = 'http://localhost:5102/api/user/GetAllUsers';

  constructor(private http: HttpClient) { }

  //henter alle cases
  getAllCases(): Observable<Case[]> {
    return this.http.get<Case[]>(this.apiUrl); //sender get andmodning
  }

  //henter en enkelt sag ud fra id
  getCase(id: string): Observable<Case> {
    return this.http.get<Case>(`${this.apiUrl}/${id}`); //sender get anmodning med Id
  }

  //opretter en ny sag
  createCase(newCase: Case): Observable<Case> {
    return this.http.post<Case>(this.apiUrl, newCase); //sender post anmodning
  }

  //opdater en sag med id
  updateCase(id: string, updatedFields: Partial<Case>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, updatedFields);
  }

  //slet en sag med id
  deleteCase(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); //sender delete anmodning
  }

  getTechnicians(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getStatusHistory(caseId: string): Observable<{ oldStatus: string; newStatus: string; changedAt: string }[]> {
    return this.http.get<{ oldStatus: string; newStatus: string; changedAt: string }[]>(`${this.apiUrl}/${caseId}/status-history`);
  }

}
