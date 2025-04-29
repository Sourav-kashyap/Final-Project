import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/interface/interface';
import { BrandService } from 'src/app/service/brand.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent implements OnInit {
  constructor(
    private brand: BrandService,
    private route: ActivatedRoute,
    private navigate: Router
  ) {}
  // When add new Category
  brandId: string = '';
  brandName: string = '';

  // When get category by id
  id!: string;
  brandData!: Brand;

  // When edit category
  isEditMode = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.isEditMode = true;
      this.loadBrandById();
    }
  }

  loadBrandById(): void {
    this.brand.getBrandById(this.id).subscribe({
      next: (data) => {
        this.brandData = data;
        this.brandId = this.brandData.id;
        this.brandName = this.brandData.name;
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
    };

    // Call the service to add the category
    this.brand.addBrand(brandData).subscribe({
      next: (response) => {
        console.log('Brand added successfully!', response);
        this.brandId = '';
        this.brandName = '';
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
