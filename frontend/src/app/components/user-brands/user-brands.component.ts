import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/interface/interface';
import { BrandService } from 'src/app/service/brand.service';
@Component({
  selector: 'app-user-brands',
  templateUrl: './user-brands.component.html',
  styleUrls: ['./user-brands.component.scss'],
})
export class UserBrandsComponent implements OnInit {
  brandData: Brand[] = [];
  id!: string;
  constructor(
    private readonly brand: BrandService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('id', this.id);

    this.brand.getBrandWithSameId(this.id).subscribe({
      next: (brands: Brand[]) => {
        console.log('Brands loaded:', brands);
        this.brandData = brands;
      },
      error: (err) => {
        console.error('Error loading brands:', err);
      },
    });
  }
}
