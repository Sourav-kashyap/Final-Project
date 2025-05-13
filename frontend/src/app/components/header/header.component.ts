import { Component } from '@angular/core';
import { Cart } from 'src/app/interface/interface';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly cart: CartService) {}
  totalCartProduct: number = 0;

  dropdownOpen = false;
  userName = 'Sourav';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  ngOnInit() {
    this.cartCount();
  }

  cartCount() {
    const userId = 'u1';

    this.cart.getCartByUserId(userId).subscribe({
      next: (cart: Cart) => {
        this.totalCartProduct = cart.productsId.length;
        console.log('Products in cart:', this.totalCartProduct);
      },
      error: (err) => {
        console.error('Error loading cart:', err);
      },
    });
  }

  signOut() {
    alert('Signing out...');
    // Add actual sign-out logic here (like authService.logout())
  }
}
