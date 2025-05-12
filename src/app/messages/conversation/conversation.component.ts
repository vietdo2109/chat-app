import { Component, OnInit } from '@angular/core';
import { IconsService } from '../../services/icons.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import {
  Message,
  ConversationChatSlot,
  Conversation,
  ComposeChatSlot,
  CreateMessageDTO,
} from '../../types/data';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-conversation',
  standalone: false,
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  constructor(
    private iconService: IconsService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private chatService: ChatService
  ) {}
  searchInput = '';
  conversationChatList: ConversationChatSlot[] = [];
  isGroups: boolean = false;
  chatId = '';
  messages: Message[] = [];
  currentChatSlot: ComposeChatSlot = {};
  sub!: Subscription;
  newMessage: string = '';
  private hasJoinedChat = false;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const newChatId = params['conversationId'];
      this.handleRouteChange(newChatId);
    });
  }

  private async handleRouteChange(newChatId: string) {
    // Leave previous chat if needed
    if (this.hasJoinedChat && this.chatId !== newChatId) {
      this.chatService.leaveChat(this.chatId);
    }

    this.chatId = newChatId;

    // Load groups and messages
    this.messageService.getConversations().subscribe({
      next: (res: Conversation[]) => {
        this.conversationChatList = res;
        console.log(res);
        this.currentChatSlot =
          this.conversationChatList.find((e) => e.id === this.chatId) || {};
      },
    });

    this.messageService.getMessagesByConversationId(this.chatId).subscribe({
      next: (res: Message[]) => {
        this.messages = res;
      },
    });

    // Start SignalR connection if not started
    await this.chatService.startConnection();

    // Join chat room
    this.chatService.joinChat(this.chatId);
    this.hasJoinedChat = true;

    // Subscribe once to new messages
    if (!this.sub) {
      this.sub = this.chatService.newMessages$.subscribe((msg) => {
        if (
          msg &&
          msg.chatId === this.chatId &&
          !this.messages.some((m) => m.id === msg.id)
        ) {
          this.messages.push(msg);
        }
      });
    }
  }

  adjustHeight(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 128; // 1.5em * 6 + padding = ~128px

    textarea.style.height = Math.min(scrollHeight, maxHeight) + 'px';

    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage() {
    const trimmed = this.newMessage.trim();
    if (!trimmed) return;

    const payload: CreateMessageDTO = {
      chatId: this.chatId,
      text: trimmed,
      type: 'conversation',
    };

    this.messageService.sendMessage(payload).subscribe({
      next: (res) => {
        console.log('✅ Message sent:', res);
        this.chatService.sendMessageViaSocket(res); // Optional for SignalR
        this.newMessage = '';
      },
      error: (err) => {
        console.error('❌ Failed to send message:', err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = undefined!;
    }
    if (this.hasJoinedChat) {
      this.chatService.leaveChat(this.chatId);
    }
  }
}
