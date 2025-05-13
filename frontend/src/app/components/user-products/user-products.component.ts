import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interface/interface';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';

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
    private route: ActivatedRoute,
    private readonly cartService: CartService
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

  addToCart(product: Product): void {
    const userId = 'u1';
    const productId = product.id;

    this.cartService.getCartByUserId(userId).subscribe((cart) => {
      if (!cart) {
        const newCart = {
          id: userId,
          userId: userId,
          productsId: [productId],
        };

        this.cartService.addCart(newCart).subscribe(() => {
          console.log('Cart created and product added');
        });
      } else {
        const updatedProducts = [...cart.productsId, productId];

        this.cartService
          .updateCartById(cart.id, {
            ...cart,
            productsId: updatedProducts,
          })
          .subscribe(() => {
            console.log('Product added to existing cart');
          });
      }
    });
  }

  // Buy product (navigate to checkout page or initiate purchase)
  buyNow(product: Product): void {}
}
