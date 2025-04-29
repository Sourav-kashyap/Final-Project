import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BrandService } from 'src/app/service/brand.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from 'src/app/interface/interface';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Brand> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly brand: BrandService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brand.getBrands().subscribe({
      next: (brands: Brand[]) => {
        console.log('Brands loaded:', brands);
        this.dataSource.data = brands;
      },
      error: (err) => {
        console.error('Error loading Brands:', err);
      },
    });
  }

  deleteBrand(id: string): void {
    this.brand.deleteBrandById(id).subscribe({
      next: () => {
        console.log('Brand deleted successfully!');
        this.loadBrands();
      },
      error: (error) => {
        console.error('Error deleting Brand:', error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
