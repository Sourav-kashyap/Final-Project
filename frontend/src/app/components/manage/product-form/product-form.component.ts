import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { BrandService } from 'src/app/service/brand.service';
import { Brand, Category, Product } from 'src/app/interface/interface';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categoryData: Category[] = [];
  brandData: Brand[] = [];

  // When edit product
  isEditMode = false;

  // When get product by id
  id!: string;
  productData!: Product;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly category: CategoryService,
    private readonly brand: BrandService,
    private readonly product: ProductService,
    private navigate: Router,
    private route: ActivatedRoute
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
      stock: [null, [Validators.required, Validators.min(0)]],
      images: this.formBuilder.array([this.createImage()]),
      categoryId: [null, [Validators.required]],
      brandId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.isEditMode = true;
      this.loadProductById();
    }
  }

  loadProductById(): void {
    this.product.getProductById(this.id).subscribe({
      next: (data) => {
        this.productData = data;

        this.productForm.patchValue({
          id: data.id,
          name: data.name,
          description: data.description || '',
          price: data.price,
          discount: data.discount || 0,
          stock: data.stock,
          categoryId: data.categoryId,
          brandId: data.brandId,
        });

        this.images.clear();

        if (data.images && data.images.length) {
          data.images.forEach((img: string) => {
            this.images.push(this.formBuilder.group({ imageUrl: [img] }));
          });
        } else {
          this.images.push(this.createImage());
        }
      },
      error: (err) => {
        console.error('Error loading product:', err);
      },
    });
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

  update() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;

      formData.images = formData.images.map((image: any) =>
        image.imageUrl.trim()
      );

      if (!formData.categoryId || !formData.brandId) {
        console.error('Category or Brand is missing');
        return;
      }

      if (isNaN(formData.price) || formData.price <= 0) {
        console.error('Invalid price');
        return;
      }

      this.product.updateProductById(this.id, formData).subscribe({
        next: (response) => {
          console.log('Product updated successfully!', response);
          this.navigate.navigate(['/admin/products']);
        },
        error: (error) => {
          console.error('Error updating product:', error);

          if (error.error && error.error.message) {
            console.error('Server Error:', error.error.message);
          } else if (error.error && error.error.errors) {
            console.error('Validation Errors:', error.error.errors);
          } else {
            console.error('Error details:', error);
          }
        },
      });
    } else {
      console.log('Form is invalid:', this.productForm.errors);
    }
  }
}
