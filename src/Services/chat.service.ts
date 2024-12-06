import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Case} from "./case.service";

export interface Chat {
  id: string;
  caseId: string;
  sender: string;
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:5102/api/chat';

  constructor(private http: HttpClient) { }

  getChatMessages(caseId: string): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/case/${caseId}`);
  }

  sendMessage(chat: Chat): Observable<Chat> {
    return this.http.post<Chat>(`${this.apiUrl}/send`, chat);
  }
}
