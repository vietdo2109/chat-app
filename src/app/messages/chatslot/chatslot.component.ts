import { Component, Input, input, OnInit } from '@angular/core';

import { ComposeChatSlot } from '../../types/data';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chatslot',
  standalone: false,
  templateUrl: './chatslot.component.html',
  styleUrls: ['./chatslot.component.scss'],
})
export class ChatslotComponent implements OnInit {
  @Input() type!: 'conversation' | 'group' | 'ai';
  @Input() chatSlot!: ComposeChatSlot;
  @Input() currentChatSlot!: string;
  isCurrent: boolean = false;
  safeAvatarUrl: SafeUrl | null = null;

  constructor() {}

  ngOnInit() {
    this.isCurrent = this.currentChatSlot === this.chatSlot.id;
    console.log(this.chatSlot.avatar);
  }
}
