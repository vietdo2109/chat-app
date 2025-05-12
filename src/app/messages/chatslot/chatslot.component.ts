import { Component, input, OnInit } from '@angular/core';

import {
  ComposeChatSlot,
  ConversationChatSlot,
  GroupChatSlot,
} from '../../types/data';

@Component({
  selector: 'app-chatslot',
  standalone: false,
  templateUrl: './chatslot.component.html',
  styleUrls: ['./chatslot.component.scss'],
})
export class ChatslotComponent implements OnInit {
  isGroup = input<boolean>();
  chatSlot = input<ComposeChatSlot>();

  constructor() {}

  ngOnInit() {}
}
