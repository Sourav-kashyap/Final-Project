import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly category: CategoryService) {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.category.getCategories().subscribe({
      next: (data) => {
        console.log('Categories loaded:', data);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
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
