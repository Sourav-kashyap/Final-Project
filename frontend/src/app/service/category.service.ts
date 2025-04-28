import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  private categoryBaseUrl = 'http://127.0.0.1:3002';
  getCategories() {
    return this.http.get(`${this.categoryBaseUrl}/categories`);
  }
}
