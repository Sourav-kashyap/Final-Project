import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/interface';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrls: ['./user-products.component.scss'],
})
export class UserProductsComponent implements OnInit {
  productData: Product[] = [];
  id!: string;
  constructor(
    private readonly product: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('id', this.id);

    this.product.getProductWithSameId(this.id).subscribe({
      next: (brands: Product[]) => {
        console.log('Product loaded:', brands);
        this.productData = brands;
      },
      error: (err) => {
        console.error('Error loading Product:', err);
      },
    });
  }

  // Add product to the cart
  addToCart(product: Product): void {}

  // Buy product (navigate to checkout page or initiate purchase)
  buyNow(product: Product): void {}
}
