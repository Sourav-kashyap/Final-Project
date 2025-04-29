import { Component } from '@angular/core';
import { Category } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  constructor(private category: CategoryService) {}

  categoryId: string = '';
  categoryName: string = '';

  add() {
    const categoryData: Category = {
      id: this.categoryId,
      name: this.categoryName,
    };

    // Call the service to add the category
    this.category.addCategory(categoryData).subscribe({
      next: (response) => {
        console.log('Category added successfully!', response);
        this.categoryId = '';
        this.categoryName = '';
      },
      error: (error) => {
        console.error('Error adding category:', error);
      },
    });
  }
}
