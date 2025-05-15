import { Component, OnInit } from '@angular/core';
import { Cart, Product } from 'src/app/interface/interface';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
// import { AuthService } from 'src/app/service/auth.service'; // Assuming you have an AuthService to get logged-in user

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnInit {
  cartData: Cart[] = [];
  cartProductsId: string[] = [];
  productData: Product[] = [];
  loggedInUserId: string = '';
  totalPrice: number = 0;

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService // private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.getAllCarts();
  }

  getAllCarts() {
    this.loggedInUserId = 'u2';
    this.cartService.getCarts().subscribe({
      next: (carts: Cart[]) => {
        console.log('Cart loaded:', carts);
        this.cartData = carts.filter(
          (cart) => cart.userId === this.loggedInUserId
        );

        // Extract product IDs
        this.extractProductIds();

        // Find and expand products
        this.findProductsByIds();
      },
      error: (err) => {
        console.error('Error loading Cart:', err);
      },
    });
  }

  extractProductIds() {
    this.cartProductsId = this.cartData.flatMap((cart) => cart.productsId);
    console.log('Extracted Product IDs:', this.cartProductsId);
  }

  findProductsByIds() {
    this.productService.getProducts().subscribe({
      next: (allProducts: Product[]) => {
        const productCountMap = this.createProductCountMap(this.cartProductsId);

        // Filter products that are present in the cart
        this.productData = allProducts.filter((product) =>
          productCountMap.has(product.id)
        );

        // Expand the products according to their counts in the cart
        const expandedProducts = this.expandProductsByCount(
          this.productData,
          productCountMap
        );

        this.productData = expandedProducts; // 🛠️ update with expanded list
        this.totalPrice = 0; // ✅ Reset total before summing

        // ✅ Recalculate totalPrice
        this.productData.forEach((product: Product) => {
          const discount = product.discount ?? 0;
          const discountAmount = product.price * (discount / 100);
          this.totalPrice += product.price - discountAmount;
        });

        console.log('Matched and Expanded Products:', expandedProducts);
      },
      error: (err) => {
        console.error('Error loading Products:', err);
      },
    });
  }

  // Helper function for product counts
  createProductCountMap(cartProductsId: string[]): Map<string, number> {
    const productCountMap = new Map<string, number>();

    cartProductsId.forEach((productId) => {
      productCountMap.set(productId, (productCountMap.get(productId) || 0) + 1);
    });

    return productCountMap;
  }

  // products based on their count in the cart
  expandProductsByCount(
    products: Product[],
    productCountMap: Map<string, number>
  ): Product[] {
    const expandedProducts: Product[] = [];

    products.forEach((product) => {
      const count = productCountMap.get(product.id) || 0;
      for (let i = 0; i < count; i++) {
        expandedProducts.push(product);
      }
    });

    return expandedProducts;
  }
  userId = 'u2';

  removeProduct(productId: string) {
    this.cartService
      .deleteSingleProduct(productId, this.cartData[0].id)
      .subscribe({
        next: () => {
          console.log('Cart product is deleted');
          this.getAllCarts();
          this.cartService.refreshCartCount(this.userId);
        },
        error: (err) => {
          console.error('Error deleting cart product:', err);
        },
      });
  }
  buyNow() {}
}
