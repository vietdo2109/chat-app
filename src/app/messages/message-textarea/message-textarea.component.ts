import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-textarea',
  standalone: false,
  templateUrl: './message-textarea.component.html',
  styleUrls: ['./message-textarea.component.scss'],
})
export class MessageTextareaComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 128; // 1.5em * 6 + padding = ~128px

    textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';

    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  }
}
