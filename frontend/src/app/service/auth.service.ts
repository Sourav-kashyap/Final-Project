import { Injectable } from '@angular/core';
import { Token } from '../interface/interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private userBaseUrl = 'http://127.0.0.1:3001';

  login(credentials: { email: string; password: string }): Observable<Token> {
    return this.http.post<{ token: string }>(
      `${this.userBaseUrl}/login`,
      credentials
    );
  }
}
