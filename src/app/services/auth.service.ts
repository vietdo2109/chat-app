import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

const BASE_URL = 'https://localhost:7159/api/account';

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
  constructor(private http: HttpClient) {}

  onLogin(obj: LoginObject): Observable<any> {
    return this.http.post(`${BASE_URL}/login`, obj, {
      withCredentials: true, // 👈 REQUIRED or cookies won't be sent
    });
  }

  onRegister(obj: RegisterObject): Observable<any> {
    return this.http.post(`${BASE_URL}/register`, obj);
  }
}
