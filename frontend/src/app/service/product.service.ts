import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private productBaseUrl = 'http://127.0.0.1:3003';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.productBaseUrl}/products`);
  }

  addProduct(productData: Product): Observable<any> {
    return this.http.post<any>(`${this.productBaseUrl}/products`, productData);
  }

  updateProductById(id: string, product: Product): Observable<void> {
    return this.http.patch<void>(
      `${this.productBaseUrl}/products/${id}`,
      product,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.productBaseUrl}/products/${id}`);
  }

  getProductWithSameId(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.productBaseUrl}/productWithSame/${id}`
    );
  }

  deleteProductById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.productBaseUrl}/products/${id}`);
  }
}
