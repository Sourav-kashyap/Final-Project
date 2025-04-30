import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interface/interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'discount',
    'action',
  ];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly Product: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.Product.getProducts().subscribe({
      next: (products: Product[]) => {
        console.log('products loaded:', products);
        this.dataSource.data = products;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }

  deleteProduct(id: string): void {
    this.Product.deleteProductById(id).subscribe({
      next: () => {
        console.log('Product deleted successfully!');
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deleting Product:', error);
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
