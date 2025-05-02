import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
  constructor(
    private category: CategoryService,
    private route: ActivatedRoute,
    private navigate: Router
  ) {}
  // When add new Category
  categoryId: string = '';
  categoryName: string = '';
  categoryImgUrl: string = '';
  categoryDescription: string = '';

  // When get category by id
  id!: string;
  categoryData!: Category;

  // When edit category
  isEditMode = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.isEditMode = true;
      this.loadCategoryById();
    }
  }

  loadCategoryById(): void {
    this.category.getCategoryById(this.id).subscribe({
      next: (data) => {
        this.categoryData = data;
        this.categoryId = this.categoryData.id;
        this.categoryName = this.categoryData.name;
        this.categoryImgUrl = this.categoryData.imageUrl
          ? this.categoryData.imageUrl
          : '';
        this.categoryDescription = this.categoryData.description
          ? this.categoryData.description
          : '';
        console.log('Category Data:', this.categoryData);
      },
      error: (err) => {
        console.error('Error loading category:', err);
      },
    });
  }

  add() {
    const categoryData: Category = {
      id: this.categoryId,
      name: this.categoryName,
      imageUrl: this.categoryImgUrl,
      description: this.categoryDescription,
    };

    // Call the service to add the category
    this.category.addCategory(categoryData).subscribe({
      next: (response) => {
        console.log('Category added successfully!', response);
        this.categoryId = '';
        this.categoryName = '';
        this.categoryImgUrl = '';
        this.categoryDescription = '';
        this.navigate.navigate(['/admin/categories']);
      },
      error: (error) => {
        console.error('Error adding category:', error);
      },
    });
  }

  update() {
    const updatedCategory: Category = {
      id: this.categoryId,
      name: this.categoryName,
      imageUrl: this.categoryImgUrl,
      description: this.categoryDescription,
    };

    this.category.updateCategoryById(this.id, updatedCategory).subscribe({
      next: (_) => {
        console.log('Category updated successfully!');
        this.navigate.navigate(['/admin/categories']);
      },
      error: (error) => {
        console.error('Error updating category:', error);
      },
    });
  }
}
