import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userBaseUrl = 'http://127.0.0.1:3001';
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userBaseUrl}/users`);
  }
}
