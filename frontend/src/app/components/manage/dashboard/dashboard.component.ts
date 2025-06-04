import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private readonly product: ProductService) {}
  count: number = 0;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.product.getProductCount().subscribe({
      next: (response: { count: number }) => {
        console.log('products loaded:', response);
        this.count = response.count; // Extract the count
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }
}
