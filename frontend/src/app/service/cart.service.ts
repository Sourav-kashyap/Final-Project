import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartBaseUrl = 'http://127.0.0.1:3006';

  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.cartBaseUrl}/carts`);
  }

  getCartById(id: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.cartBaseUrl}/carts/${id}`);
  }

  addCart(cartData: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.cartBaseUrl}/carts`, cartData);
  }

  updateCartById(id: string, cartData: Cart): Observable<void> {
    return this.http.patch<void>(`${this.cartBaseUrl}/carts/${id}`, cartData);
  }

  deleteCartById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.cartBaseUrl}/carts/${id}`);
  }

  getCartCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.cartBaseUrl}/carts/count`);
  }

  getCartByUserId(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.cartBaseUrl}/carts/user/${userId}`);
  }
}
