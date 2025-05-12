import { Component } from '@angular/core';
import { IconsService } from '../../services/icons.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import {
  Message,
  ConversationChatSlot,
  Conversation,
  GroupChatSlot,
  Group,
  ComposeChatSlot,
  CreateMessageDTO,
} from '../../types/data';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private iconService: IconsService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}
  searchInput = '';
  conversationChatList: ConversationChatSlot[] = [];
  groupChatList: GroupChatSlot[] = [];
  isGroups: boolean = false;

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      const isGroupPath = segments.some((s) => s.path === 'groups');
      this.isGroups = isGroupPath;

      if (this.isGroups) {
        this.messageService.getGroupsMembers().subscribe({
          next: (res: Group[]) => {
            console.log('groupsMembers', res);
            this.groupChatList = res;
          },
        });
      } else {
        this.messageService.getConversations().subscribe({
          next: (res: Conversation[]) => {
            console.log('conversations', res);
            this.conversationChatList = res;
          },
        });
      }
    });
  }

  ngOnDestroy(): void {}
}
