import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgForOf } from '@angular/common';
import { Notes, NotesService } from '../../Services/notes.service';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgForOf
  ],
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Notes[] = [];
  caseId: string | null = null;
  newNoteMessage: string = '';

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<NotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { caseId: string }
  ) {}

  ngOnInit(): void {
    this.caseId = this.data.caseId;
    this.loadNotes(this.caseId);
  }

  loadNotes(caseId: string): void {
    this.notesService.getnotes(caseId).subscribe({
      next: (notes) => this.notes = notes,
      error: (err) => console.error('Error loading notes:', err)
    });
  }

  addNote(): void {
    if (!this.newNoteMessage.trim()) return;

    const newNote: Notes = {
      id: this.generateGuid(),
      caseId: this.caseId || '',
      message: this.newNoteMessage.trim(),
      CreatedAt: new Date().toISOString()
    };

    this.notesService.sendnotes(newNote).subscribe({
      next: (addedNote) => {
        this.notes.push(addedNote);
        this.newNoteMessage = '';
      },
      error: (err) => console.error('Error adding note:', err)
    });
  }

  private generateGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
