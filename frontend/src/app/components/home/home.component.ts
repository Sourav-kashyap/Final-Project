import { Component } from '@angular/core';
import { Category } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  categoryData: Category[] = [];
  constructor(private readonly category: CategoryService) {}
  ngOnInit() {
    this.category.getCategories().subscribe({
      next: (categories: Category[]) => {
        console.log('Categories loaded:', categories);
        this.categoryData = categories;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });
  }
}
