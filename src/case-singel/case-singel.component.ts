import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule, DatePipe, NgClass, NgIf, NgStyle} from "@angular/common";
import {Case, CaseService} from '../Services/case.service';
import {ActivatedRoute, Router} from '@angular/router';
import {sendMessage} from '@microsoft/signalr/dist/esm/Utils';
import {FormsModule} from '@angular/forms';
import {Chat, ChatService} from '../Services/chat.service';

@Component({
  selector: 'app-case-singel',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgStyle,
    FormsModule,
    NgClass,
    CommonModule
  ],
  templateUrl: './case-singel.component.html',
  styleUrl: './case-singel.component.css'
})
export class CaseSingelComponent {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  chatMessages: Chat[] = [];
  newMessage: string = '';
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
  chatRefreshInterval: any;

  constructor(private route: ActivatedRoute,
              private caseService: CaseService,
              private chatService: ChatService,
              private router: Router) {}

  ngOnInit(): void {
    // Hent ID fra URL
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Hent sagsoplysninger
      this.caseService.getCase(id).subscribe({
        next: (data) => {
          this.foundCase = data; // Gem sagsdata
          this.currentStatusIndex = this.statuses.indexOf(data.status); // Find status-indeks

          // Hent chatbeskeder første gang
          this.loadChatMessages(id);

          // Start interval til at opdatere chatbeskeder
          this.chatRefreshInterval = setInterval(() => {
            this.loadChatMessages(id);
          }, 3000); // Opdater hvert 3. sekund
        },
        error: (err) => console.error('Fejl ved hentning af sag:', err),
      });
    }
  }

  ngOnDestroy(): void {
    // Stop intervallet, når komponenten destrueres
    if (this.chatRefreshInterval) {
      clearInterval(this.chatRefreshInterval);
    }
  }


  loadChatMessages(caseId: string): void {
    this.chatService.getChatMessages(caseId).subscribe({
      next: (messages) => {
        // Sorter beskederne efter timestamp
        this.chatMessages = messages.sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      },
      error: (err) => console.error('Fejl ved hentning af beskeder:', err),
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim() || !this.foundCase) {
      console.error('Besked eller sag mangler!');
      return; // Undgå at sende tomme beskeder
    }

    // Opret en ny besked
    const newChatMessage: Chat = {
      id: this.generateGuid(), // Generer et unikt GUID
      caseId: this.foundCase.id, // Tilknytning til sagen
      sender: 'Kunde', // Statisk for kunden
      message: this.newMessage.trim(), // Indholdet af beskeden
      timestamp: new Date().toISOString(), // Generér tidsstemplet
    };

    console.log('Sender chat:', newChatMessage);

    // Send beskeden via ChatService
    this.chatService.sendMessage(newChatMessage).subscribe({
      next: (sentMessage) => {
        // Tilføj beskeden og sorter listen igen
        this.chatMessages = [...this.chatMessages, sentMessage].sort((a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
        this.newMessage = ''; // Ryd inputfeltet
      },
      error: (err) => {
        console.error('Fejl ved afsendelse af besked:', err.error);
        alert('Kunne ikke sende besked. Prøv igen senere.');
      },
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

  goBack() {
    this.router.navigate(['/frontpage']);
  }
}
