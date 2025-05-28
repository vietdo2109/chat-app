import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../types/messages';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection!: signalR.HubConnection;
  private messagesSubject = new BehaviorSubject<Message | null>(null);
  public newMessages$ = this.messagesSubject.asObservable();
  private connectionStarted = false;

  startConnection() {
    if (this.connectionStarted) return;
    else {
      this.connectionStarted = true;
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7159/chatHub') // 👈 your backend URL
        .withAutomaticReconnect()
        .build();

      this.registerReceiveMessageHandler();

      return this.hubConnection
        .start()
        .then(() => console.log('✅ SignalR connected.'))
        .catch((err) => console.error('❌ SignalR connection error:', err));
    }
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => {
        console.log('🔌 SignalR disconnected.');
      });
    }
  }

  joinChat(chatId: string) {
    if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
      this.hubConnection
        .invoke('JoinChat', chatId)
        .catch((err) => console.error(err));
    } else {
      console.warn('⚠️ Tried to join chat before connection was ready');
    }
  }

  leaveChat(chatId: string) {
    this.hubConnection
      .invoke('LeaveChat', chatId)
      .catch((err) => console.error(err));
  }

  sendMessageViaSocket(message: Message) {
    this.hubConnection
      .invoke('SendMessageToChat', message)
      .catch((err) => console.error('❌ SignalR send error:', err));
  }

  registerReceiveMessageHandler() {
    this.hubConnection.on('ReceiveMessage', (message: Message) => {
      console.log('📥 Real-time message received:', message);
      this.messagesSubject.next(message); // Broadcast to subscribers
    });
  }
}
