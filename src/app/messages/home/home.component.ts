import { Component } from '@angular/core';
import { IconsService } from '../../services/icons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Conversation, ConversationChatSlot } from '../../types/conversation';
import { Group, GroupChatSlot } from '../../types/group';
import { AI, AIChatSlot } from '../../types/ai';
import { AiService } from '../../services/ai.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAiModalComponent } from '../create-ai-modal/create-ai-modal.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private aiService: AiService,
    private dialog: MatDialog
  ) {}
  searchInput = '';
  conversationChatList: ConversationChatSlot[] = [];
  groupChatList: GroupChatSlot[] = [];
  aiChatList: AIChatSlot[] = [];
  isGroups: boolean = false;
  isConversations: boolean = false;
  isAIs: boolean = false;

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      if (segments.some((s) => s.path === 'groups')) {
        this.isGroups = true;
        this.isConversations = false;
        this.isAIs = false;
      } else if (segments.some((s) => s.path === 'ais')) {
        this.isGroups = false;
        this.isConversations = false;
        this.isAIs = true;
      } else {
        this.isGroups = false;
        this.isConversations = true;
        this.isAIs = false;
      }

      if (this.isGroups) {
        this.messageService.getGroupsMembers().subscribe({
          next: (res: Group[]) => {
            console.log('groupsMembers', res);
            this.groupChatList = res;
          },
        });
      } else if (this.isConversations) {
        this.messageService.getConversations().subscribe({
          next: (res: Conversation[]) => {
            console.log('conversations', res);
            this.conversationChatList = res;
          },
        });
      } else if (this.isAIs) {
        this.aiService.getAIs().subscribe({
          next: (res: AI[]) => {
            console.log('AIs', res);
            this.aiChatList = res;
          },
        });
      }
    });
  }
  openAddAIModal() {
    this.dialog.open(CreateAiModalComponent);
  }
  ngOnDestroy(): void {}
}
