import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CreateAIModel } from '../../types/ai';
import { AiService } from '../../services/ai.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

type FormError = {
  avatar?: string;
  name?: string;
  characterBase?: string;
  systemPrompt?: string;
};
@Component({
  selector: 'app-create-ai-modal',
  standalone: false,
  templateUrl: './create-ai-modal.component.html',
  styleUrls: ['./create-ai-modal.component.scss'],
})
export class CreateAiModalComponent implements OnInit {
  data: CreateAIModel = {
    avatar: '',
    gender: 0,
    name: '',
    characterBase: '',
    systemPrompt: '',
  };
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(
    private aiService: AiService,
    private dialogRef: MatDialogRef<CreateAiModalComponent>,
    private router: Router
  ) {}
  validateForm(): boolean {
    return true;
  }
  ngOnInit() {}
  onUploadClick() {
    this.fileInputRef.nativeElement.click();
  }

  handleSubmit() {
    // valite the form data
    console.log(this.data);
    let isFormValid = this.validateForm();
    if (isFormValid) {
      this.aiService.createAI(this.data).subscribe({
        next: (res) => {
          console.log('AI created successfully:', res);
          this.dialogRef.close(res);
          this.router.navigate([`/messages/ais/${res.id}`]);
        },
        error: (error) => {
          console.error('Error creating AI:', error);
        },
      });
    }

    // if data is valid, create new ai
  }
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const maxSizeMB = 5;
    const allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG and PNG images are allowed.');
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.data.avatar = reader.result as string; // full base64 string
    };
    reader.readAsDataURL(file); // includes "data:image/png;base64,..."
  }
}
