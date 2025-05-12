import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateMessageDTO } from '../types/data';
const BASE_URL = 'https://localhost:7159/api';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getConversationMessages(conversationId: string): Observable<any> {
    return this.http.get(
      `${BASE_URL}/conversations/${conversationId}/messages`,
      {
        withCredentials: true, // 👈 REQUIRED or cookies won't be sent
      }
    );
  }

  getGroupsMembers(): Observable<any> {
    return this.http.get(`${BASE_URL}/groupsmembers`, {
      withCredentials: true, // 👈 REQUIRED or cookies won't be sent
    });
  }

  getConversations(): Observable<any> {
    return this.http.get(`${BASE_URL}/conversations`, {
      withCredentials: true, // 👈 REQUIRED or cookies won't be sent
    });
  }

  getMessagesByConversationId(conversationId: string): Observable<any> {
    return this.http.get(
      `${BASE_URL}/conversations/${conversationId}/messages`,
      {
        withCredentials: true, // 👈 REQUIRED or cookies won't be sent
      }
    );
  }

  getMessagesByGroupId(groupId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/groups/${groupId}/messages`, {
      withCredentials: true, // 👈 REQUIRED or cookies won't be sent
    });
  }

  sendMessage(message: CreateMessageDTO): Observable<any> {
    return this.http.post(`${BASE_URL}/messages`, message, {
      withCredentials: true, // to include cookies for auth
    });
  }
}
