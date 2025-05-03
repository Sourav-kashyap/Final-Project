import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/interface/interface';
import { BrandService } from 'src/app/service/brand.service';
import { Category } from 'src/app/interface/interface';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent implements OnInit {
  constructor(
    private readonly brand: BrandService,
    private readonly route: ActivatedRoute,
    private readonly navigate: Router,
    private readonly category: CategoryService
  ) {}
  // When add new Category
  categoryData: Category[] = [];
  brandId: string = '';
  brandName: string = '';
  brandImgUrl: string = '';
  brandDescription: string = '';
  brandCategoryId: string = '';

  // When get category by id
  id!: string;
  brandData!: Brand;

  // When edit category
  isEditMode = false;

  ngOnInit(): void {
    this.getAllCategories();
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.isEditMode = true;
      this.loadBrandById();
    }
  }

  getAllCategories() {
    this.category.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categoryData = categories;
        console.log(this.categoryData);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });
  }

  loadBrandById(): void {
    this.brand.getBrandById(this.id).subscribe({
      next: (data) => {
        this.brandData = data;
        this.brandId = this.brandData.id;
        this.brandName = this.brandData.name;
        this.brandImgUrl = this.brandData.imageUrl
          ? this.brandData.imageUrl
          : '';
        this.brandDescription = this.brandData.description
          ? this.brandData.description
          : '';
        this.brandCategoryId = this.brandData.categoryId;
        console.log('Brand Data:', this.brandData);
      },
      error: (err) => {
        console.error('Error loading brand:', err);
      },
    });
  }

  add() {
    const brandData: Brand = {
      id: this.brandId,
      name: this.brandName,
      imageUrl: this.brandImgUrl,
      description: this.brandDescription,
      categoryId: this.brandCategoryId,
    };

    console.log(brandData);

    // Call the service to add the brand
    this.brand.addBrand(brandData).subscribe({
      next: (response) => {
        console.log('Brand added successfully!', response);
        this.brandId = '';
        this.brandName = '';
        this.brandDescription = '';
        this.brandImgUrl = '';
        this.brandCategoryId = '';
        this.navigate.navigate(['/admin/brands']);
      },
      error: (error) => {
        console.error('Error adding brand:', error);
      },
    });
  }

  update() {
    const updatedBrand: Brand = {
      id: this.brandId,
      name: this.brandName,
      imageUrl: this.brandImgUrl,
      description: this.brandDescription,
      categoryId: this.brandCategoryId,
    };

    this.brand.updateBrandById(this.id, updatedBrand).subscribe({
      next: (_) => {
        console.log('Brand updated successfully!');
        this.navigate.navigate(['/admin/brands']);
      },
      error: (error) => {
        console.error('Error updating brand:', error);
      },
    });
  }
}
