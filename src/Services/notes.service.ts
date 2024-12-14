import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Chat} from './chat.service';
import {HttpClient} from '@angular/common/http';

export interface Notes {
  id: string;
  caseId: string;
  message: string;
  CreatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:5102/api/Notes';

  constructor(private http: HttpClient) {
  }

  getnotes(caseId: string): Observable<Notes[]> {
    return this.http.get<Notes[]>(`${this.apiUrl}/case/${caseId}`);
  }

  sendnotes(notes: Notes): Observable<Notes> {
    return this.http.post<Notes>(`${this.apiUrl}/send`, notes);
  }
}
