import { Component } from '@angular/core';
// import { Category } from 'src/app/interface/interface';
// import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // categoryData: Category[] = [];

  // constructor(private readonly category: CategoryService) {}

  // ngOnInit() {
  //   this.category.getCategories().subscribe({
  //     next: (categories: Category[]) => {
  //       console.log('Categories loaded:', categories);
  //       this.categoryData = categories;
  //     },
  //     error: (err) => {
  //       console.error('Error loading categories:', err);
  //     },
  //   });
  // }

  dropdownOpen = false;
  userName = 'Sourav';

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  signOut() {
    alert('Signing out...');
    // Add actual sign-out logic here (like authService.logout())
  }
}
