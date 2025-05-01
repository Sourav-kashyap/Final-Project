import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { BrandService } from 'src/app/service/brand.service';
import { Brand, Category } from 'src/app/interface/interface';
import { ProductService } from 'src/app/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categoryData: Category[] = [];
  brandData: Brand[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly category: CategoryService,
    private readonly brand: BrandService,
    private readonly product: ProductService,
    private navigate: Router
  ) {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      discount: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      images: this.formBuilder.array([this.createImage()]),
      categoryId: [null, [Validators.required]],
      brandId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
  }

  getAllCategories() {
    this.category.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categoryData = categories;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      },
    });
  }

  getAllBrands() {
    this.brand.getBrands().subscribe({
      next: (brands: Brand[]) => {
        this.brandData = brands;
      },
      error: (err) => {
        console.error('Error loading Brands:', err);
      },
    });
  }

  get images(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  createImage(): FormGroup {
    return this.formBuilder.group({
      imageUrl: ['', Validators.required],
    });
  }

  addImage(): void {
    this.images.push(this.createImage());
  }

  removeImage(index: number): void {
    this.images.removeAt(index);
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;

      // Ensure that the 'images' array contains valid strings (URLs)
      const imageUrls = formData.images.map((image: any) =>
        image.imageUrl.trim()
      );
      formData.images = imageUrls;

      this.product.addProduct(formData).subscribe({
        next: (response) => {
          console.log('Product added successfully!', response);
          this.navigate.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error('Error adding product:', error);
        },
      });
    } else {
      console.log('Form is invalid:', this.productForm.errors);
    }
  }
}
