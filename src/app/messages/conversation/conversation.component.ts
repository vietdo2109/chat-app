import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IconsService } from '../../services/icons.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Conversation, ConversationChatSlot } from '../../types/conversation';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { ComposeChatSlot } from '../../types/data';
import { CreateMessageDTO, Message } from '../../types/Message';
@Component({
  selector: 'app-conversation',
  standalone: false,
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss'],
})
export class ConversationComponent implements OnInit {
  constructor(
    private iconService: IconsService,
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
  @ViewChild('messagesContainter') private messagesContainer!: ElementRef;

  // loading messages variables
  isLoadingMessages: boolean = false;
  currentPage = 1;
  itemsPerPage = 15;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const newChatId = params['conversationId'];
      this.handleRouteChange(newChatId);
    });
  }

  private async handleRouteChange(newChatId: string) {
    this.currentPage = 1;
    this.isLoadingMessages = false;

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

    this.messageService
      .getMessagesByConversationId(
        this.chatId,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (res: Message[]) => {
          this.messages = res;
          console.log('messages', res);
          setTimeout(() => {
            this.scrollToBottom();
          }, 200); // Use a slight delay
        },
      });

    // Start SignalR connection if not started
    await this.chatService.startConnection();

    // Join chat room
    this.chatService.joinChat(this.chatId);
    this.hasJoinedChat = true;

    // Subscribe once to new messages
    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.chatService.newMessages$.subscribe((msg) => {
      if (
        msg &&
        msg.chatId === this.chatId &&
        !this.messages.some((m) => m.id === msg.id)
      ) {
        this.messages.push(msg);
        this.scrollToBottom();
      }
    });
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

  scrollToBottom() {
    if (this.messagesContainer) {
      setTimeout(() => {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }, 0);
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
        this.scrollToBottom(); // 👈 auto-scroll after sending message
      },
      error: (err) => {
        console.error('❌ Failed to send message:', err);
      },
    });
  }

  toggleLoading() {
    this.isLoadingMessages = !this.isLoadingMessages;
  }

  loadMoreMessages() {
    if (this.isLoadingMessages) return;
    this.toggleLoading();
    this.messageService
      .getMessagesByConversationId(
        this.chatId,
        this.currentPage,
        this.itemsPerPage
      )
      .subscribe({
        next: (res) => {
          this.messages = [...res, ...this.messages];
          this.currentPage += 1;
        },
        error: (err) => console.log(err),
        complete: () => {
          this.toggleLoading();
        },
      });
  }

  shouldShowSenderName(index: number): boolean {
    if (index === 0) return true;
    return this.messages[index].senderId !== this.messages[index - 1].senderId;
  }

  onScroll() {
    if (this.currentPage === 1) {
      this.currentPage = 2;
    }
    this.loadMoreMessages();
    console.log(this.isLoadingMessages);
    console.log('scroliing');
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
