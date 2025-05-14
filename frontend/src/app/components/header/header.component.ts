import { Component } from '@angular/core';
// import { Cart } from 'src/app/interface/interface';
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
    const userId = 'u2';
    // Refresh count once when header loads
    this.cart.refreshCartCount(userId);
    // Subscribe to the cart count for real-time updates
    this.cart.cartCount$.subscribe((count) => {
      this.totalCartProduct = count;
    });
  }

  signOut() {
    alert('Signing out...');
    // Add actual sign-out logic here (like authService.logout())
  }
}
