import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private http: HttpClient) {}
  private brandBaseUrl = 'http://127.0.0.1:3007';

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.brandBaseUrl}/brands`);
  }

  addBrand(brandData: Brand): Observable<Brand> {
    console.log('add karo', brandData);

    return this.http.post<Brand>(`${this.brandBaseUrl}/brands`, brandData);
  }

  updateBrandById(id: string, brand: Brand): Observable<void> {
    return this.http.patch<void>(`${this.brandBaseUrl}/brands/${id}`, brand);
  }

  getBrandById(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.brandBaseUrl}/brands/${id}`);
  }

  deleteBrandById(id: string): Observable<void> {
    return this.http.delete<void>(`${this.brandBaseUrl}/brands/${id}`);
  }
}
