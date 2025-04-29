import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  private categoryBaseUrl = 'http://127.0.0.1:3002';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categoryBaseUrl}/categories`);
  }

  addCategory(categoryData: Category): Observable<Category> {
    return this.http.post<Category>(
      `${this.categoryBaseUrl}/categories`,
      categoryData
    );
  }
}
