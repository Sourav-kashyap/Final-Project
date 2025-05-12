import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../interface/interface';
import { SignupPayload } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userBaseUrl = 'http://127.0.0.1:3001';

  constructor(private http: HttpClient) {}

  // Login method
  login(credentials: { email: string; password: string }): Observable<Token> {
    console.log('service credentials:', credentials);
    return this.http.post<Token>(`${this.userBaseUrl}/login`, credentials);
  }

  // Signup method
  signup(payload: SignupPayload): Observable<Token> {
    console.log('service payload:', payload);
    return this.http.post<Token>(`${this.userBaseUrl}/signup`, payload);
  }
}
