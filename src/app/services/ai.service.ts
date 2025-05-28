import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AI, CreateAIModel, GenContentRequest } from '../types/ai';
import { map, Observable } from 'rxjs';
import { Message } from '../types/messages';
const BASE_URL =
  'https://app-chat-dev-001-h5h0h4enfjg5c5cc.canadacentral-01.azurewebsites.net/api';

@Injectable({
  providedIn: 'root',
})
export class AiService {
  constructor(private http: HttpClient) {}

  generateContent(data: GenContentRequest): Observable<Message> {
    return this.http.post<Message>(`${BASE_URL}/generateContent`, data, {
      withCredentials: true, // to include cookies for auth
    });
  }

  getAIs(): Observable<any> {
    return this.http.get(`${BASE_URL}/ais`, {
      withCredentials: true, // 👈 REQUIRED or cookies won't be sent
    });
  }

  getMessagesByAiId(aiId: string, pageNumber: number, pageSize: number) {
    return this.http
      .get<any[]>(`${BASE_URL}/ais/${aiId}/messages`, {
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
  createAI(data: CreateAIModel) {
    return this.http.post<AI>(`${BASE_URL}/ais`, data, {
      withCredentials: true, // to include cookies for auth
    });
  }
}
