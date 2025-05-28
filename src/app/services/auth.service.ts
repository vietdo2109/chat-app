import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

const BASE_URL =
  'https://app-chat-dev-001-h5h0h4enfjg5c5cc.canadacentral-01.azurewebsites.net/api/account';

type LoginObject = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type RegisterObject = {
  username: string;
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  onLogin(obj: LoginObject): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, obj, {
      withCredentials: true, // 👈 REQUIRED or cookies won't be sent
    });
  }

  onRegister(obj: RegisterObject): Observable<any> {
    return this.http.post(`${BASE_URL}/register`, obj);
  }

  refreshToken(): Observable<any> {
    return this.http.post(`${BASE_URL}/refresh`, {}, { withCredentials: true });
  }

  onLogout() {
    this.http
      .post(`${BASE_URL}/logout`, {}, { withCredentials: true })
      .subscribe();
    this.router.navigate(['/auth/login']);
  }
}
