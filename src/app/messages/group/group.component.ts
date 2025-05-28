import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IconsService } from '../../services/icons.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from '../../services/message.service';

import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';
import { Group, GroupChatSlot } from '../../types/group';
import { CreateMessageDTO, Message } from '../../types/messages';
import { ComposeChatSlot } from '../../types/data';

@Component({
  selector: 'app-group',
  standalone: false,
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private chatService: ChatService
  ) {}
  searchInput = '';
  groupChatList: GroupChatSlot[] = [];
  isGroups: boolean = true;
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
      const newChatId = params['groupId'];
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
    this.messageService.getGroupsMembers().subscribe({
      next: (res: Group[]) => {
        this.groupChatList = res;
        console.log(res);
        this.currentChatSlot =
          this.groupChatList.find((e) => e.id === this.chatId) || {};
      },
    });

    this.messageService
      .getMessagesByGroupId(this.chatId, this.currentPage, this.itemsPerPage)
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

  sendMessage() {
    const trimmed = this.newMessage.trim();
    if (!trimmed) return;

    const payload: CreateMessageDTO = {
      chatId: this.chatId,
      text: trimmed,
      type: 'group',
    };

    this.messageService.sendMessage(payload).subscribe({
      next: (res) => {
        console.log('✅ Message sent:', res);
        this.chatService.sendMessageViaSocket(res); // Optional for SignalR

        this.newMessage = '';
        this.scrollToBottom(); // 👈 auto-scroll when new message arrives
      },
      error: (err) => {
        console.error('❌ Failed to send message:', err);
      },
    });
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      setTimeout(() => {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      }, 0);
    }
  }

  toggleLoading() {
    this.isLoadingMessages = !this.isLoadingMessages;
  }

  loadMoreMessages() {
    if (this.isLoadingMessages) return;
    this.toggleLoading();
    this.messageService
      .getMessagesByGroupId(this.chatId, this.currentPage, this.itemsPerPage)
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
