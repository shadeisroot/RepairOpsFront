import {Component, OnDestroy, OnInit} from '@angular/core';
import {Case, CaseService} from '../Services/case.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Chat, ChatService} from '../Services/chat.service';
import {sendMessage} from '@microsoft/signalr/dist/esm/Utils';
import {Router} from '@angular/router';
import {Notes, NotesService} from '../Services/notes.service';
import {MatDialog} from '@angular/material/dialog';
import {NotesComponent} from './notes/notes.component';
@Component({
  selector: 'app-cases-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cases-list.component.html',
  styleUrl: './cases-list.component.css'
})
export class CasesListComponent implements OnInit, OnDestroy{
  cases: Case[] = [];
  selectedCaseId: string | null = null;
  chatMessages: Chat[] = [];
  newMessage: string = '';
  statusOptions: string[] = [
    'Modtaget',
    'Under reparation',
    'Afventer dele',
    'Repareret og klar til afhentning'
  ];

  statusHistory: { oldStatus: string; newStatus: string; changedAt: string }[] = [];
  private chatRefreshInterval: any;



  constructor(private caseService: CaseService, private chatService: ChatService, private router: Router, private dialog: MatDialog) {}


  ngOnInit(): void {
    this.loadCases();
  }

  ngOnDestroy(): void {
    // Ryd intervallet, når komponenten destrueres
    this.clearChatRefreshInterval();
  }

  private clearChatRefreshInterval(): void {
    if (this.chatRefreshInterval) {
      clearInterval(this.chatRefreshInterval);
      this.chatRefreshInterval = null;
    }
  }

  loadCases(): void {
    this.caseService.getAllCases().subscribe({
      //hvis hentet rigtig sker dette
      next: (cases) => {
        //tilføjet en isEditing egenskab til hver sag
        this.cases = cases.map((caseItem) => ({
          ...caseItem, //beholder allerede lavet data fra sag
          isEditing: false //sætter isediting til false
        }));
      },
      //ewwor
      error: (err) => console.error('Fejl ved indlæsning af sager:', err)
    });
  }

  editCase(caseItem: Case): void {
    caseItem.isEditing = true;
  }

  saveCase(caseItem: Case): void {
    // Kun send status
    const updatedCase: Case = {
      ...caseItem,    // Beholder resten af dataene som de er
      status: caseItem.status   // Opdaterer kun status
    };

    this.caseService.updateCase(caseItem.id, updatedCase).subscribe({
      next: (response) => {
        //logger hvis opdatering lykkes
        console.log('Sagen blev opdateret:', response);
        caseItem.isEditing = false;
      },
      error: (err) => {
        //ewwor
        console.error('Fejl ved opdatering af sag:', err);
      }
    });
  }

  cancelEdit(caseItem: Case): void {
    // Gendan status fra serveren og afslut redigering
    this.loadCases();
    caseItem.isEditing = false;
  }

  viewChat(caseId: string): void {
    if (this.selectedCaseId === caseId) {
      // Hvis chatvinduet allerede vises, luk det
      this.selectedCaseId = null;
      this.clearChatRefreshInterval();
      this.statusHistory = [];
    } else {
      // Vis chat for en ny sag
      this.selectedCaseId = caseId;
      this.clearChatRefreshInterval(); // Sørg for, at tidligere intervaller stoppes
      this.loadChatMessages(caseId);
      this.loadStatusHistory(caseId);

      // Start interval til at opdatere chatbeskeder
      this.chatRefreshInterval = setInterval(() => {
        this.loadChatMessages(caseId);
      }, 1500); // Opdater hvert 1.5 sekund
    }
  }

  loadChatMessages(caseId: string): void {
    this.chatService.getChatMessages(caseId).subscribe({
      next: (messages) => {
        // Sorter beskeder efter tid (ældste først)
        this.chatMessages = messages.sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      },
      error: (err) => console.error('Fejl ved hentning af chatbeskeder:', err),
    });
  }



  // Send en besked
  sendMessage(caseId: string): void {
    if (!this.newMessage.trim()) return;

    const newChat: Chat = {
      id: this.generateGuid(),
      caseId,
      sender: 'Tekniker',
      message: this.newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    this.chatService.sendMessage(newChat).subscribe({
      next: (sentMessage) => {
        this.chatMessages.push(sentMessage); // Tilføj beskeden lokalt
        this.newMessage = ''; // Ryd inputfeltet
      },
      error: (err) => console.error('Fejl ved afsendelse af besked:', err),
    });
  }

  // GUID-generator har chatgpt lavet for os ( bruges til at lave guid)
  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Slet en sag
  deleteCase(caseId: string): void {
    if (confirm('Er du sikker på, at du vil afslutte denne sag?')) {
      this.caseService.deleteCase(caseId).subscribe({
        next: () => {
          // Fjern sagen fra listen lokalt
          this.cases = this.cases.filter((c) => c.id !== caseId);
          alert('Sagen er afsluttet.');
        },
        error: (err) => console.error('Fejl ved afslutning af sag:', err),
      });
    }
  }

  loadStatusHistory(caseId: string): void {
    this.caseService.getStatusHistory(caseId).subscribe({
      next: (history) => {
        this.statusHistory = history.sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());
      },
      error: (err) => console.error('Fejl ved hentning af status historik:', err),
    });
  }


  goMake() {
    this.router.navigate(['/case']);
  }

  viewNotes(caseId: string) {
    //this.router.navigate(['/notes', caseId]);
    this.dialog.open(NotesComponent, {
      width: '500px',
      data: { caseId }
    })
  }
}
