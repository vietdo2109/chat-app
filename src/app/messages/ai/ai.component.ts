import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IconsService } from '../../services/icons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { Message } from '../../types/messages';
import { ComposeChatSlot } from '../../types/data';
import { AI, AIChatSlot, GenContentRequest } from '../../types/ai';
import { AiService } from '../../services/ai.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAiModalComponent } from '../create-ai-modal/create-ai-modal.component';

@Component({
  selector: 'app-ai',
  standalone: false,
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.scss'],
})
export class AiComponent implements OnInit {
  constructor(
    private iconService: IconsService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private chatService: ChatService,
    private aiService: AiService,
    private dialog: MatDialog
  ) {}
  searchInput = '';
  aiChatList: AIChatSlot[] = [];
  isGroups: boolean = false;
  chatId = '';
  messages: Message[] = [];
  currentChatSlot: ComposeChatSlot = {};
  sub!: Subscription;
  newMessage: string = '';

  @ViewChild('messagesContainter') private messagesContainer!: ElementRef;

  // loading messages variables
  isLoadingMessages: boolean = false;
  currentPage = 1;
  itemsPerPage = 15;
  responseText: string = '';
  genContentState: 'pending' | 'error' | 'success' | '' = '';
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const newChatId = params['aiId'];
      this.handleRouteChange(newChatId);
    });
  }

  private async handleRouteChange(newChatId: string) {
    this.currentPage = 1;
    this.isLoadingMessages = false;
    // Leave previous chat if needed
    this.chatId = newChatId;

    // Load groups and messages
    this.aiService.getAIs().subscribe({
      next: (res: AI[]) => {
        this.aiChatList = res;
        console.log(res);
        this.currentChatSlot =
          this.aiChatList.find((e) => e.id === this.chatId) || {};
      },
    });

    this.aiService
      .getMessagesByAiId(this.chatId, this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (res: Message[]) => {
          this.messages = res;
          console.log('messages', res);
          setTimeout(() => {
            this.scrollToBottom();
          }, 200); // Use a slight delay
        },
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
    this.genContentState = 'pending';

    const payload: GenContentRequest = {
      chatId: this.chatId,
      text: trimmed,
      type: 'ai',
    };
    this.messages.push({
      chatId: this.chatId,
      text: trimmed,
      byAI: false,
    }); // ⬅️ Immediately show user message
    this.scrollToBottom();
    this.newMessage = '';

    this.aiService.generateContent(payload).subscribe({
      next: (res) => {
        this.messages.push(res);
        this.scrollToBottom(); // 👈 auto-scroll after sending message
      },
      complete: () => {
        this.genContentState = '';
      },
      error: (err) => {
        console.error('❌ Failed to send message:', err);
        this.genContentState = 'error';
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
  }

  openAddAIModal() {
    let modalRef = this.dialog.open(CreateAiModalComponent);

    modalRef.afterClosed().subscribe((result: AI | undefined) => {
      if (result) {
        this.aiChatList = [result, ...this.aiChatList];
        // You can now use `result` to update your list, send to API, etc.
      } else {
        console.log('Dialog was closed without creating AI');
      }
    });
  }
}
