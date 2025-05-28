import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CreateMessageDTO } from '../types/messages';
const BASE_URL =
  'https://app-chat-dev-001-h5h0h4enfjg5c5cc.canadacentral-01.azurewebsites.net/api';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  getMessagesByConversationId(
    conversationId: string,
    pageNumber: number,
    pageSize: number
  ): Observable<any[]> {
    return this.http
      .get<any[]>(`${BASE_URL}/conversations/${conversationId}/messages`, {
        params: {
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString(),
        },
        withCredentials: true,
      })
      .pipe(
        map((messages) => messages.reverse()) // ← this should reverse the array
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

  //  sendAIMessage(message: CreateMessageDTO): Observable<any> {
  //   return this.http.post(`${BASE_URL}/messages`, message, {
  //     withCredentials: true, // to include cookies for auth
  //   });
  // }

  getMessagesByGroupId(
    groupId: string,
    pageNumber: number,
    pageSize: number
  ): Observable<any[]> {
    return this.http
      .get<any[]>(`${BASE_URL}/groups/${groupId}/messages`, {
        params: {
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString(),
        },
        withCredentials: true, // 👈 REQUIRED or cookies won't be sent
      })
      .pipe(
        map((messages) => messages.reverse()) // ← this should reverse the array
      );
  }

  sendMessage(message: CreateMessageDTO): Observable<any> {
    return this.http.post(`${BASE_URL}/messages`, message, {
      withCredentials: true, // to include cookies for auth
    });
  }
}
