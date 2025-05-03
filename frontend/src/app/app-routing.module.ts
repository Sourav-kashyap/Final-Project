import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoriesComponent } from './components/manage/categories/categories.component';
import { CategoryFormComponent } from './components/manage/category-form/category-form.component';
import { BrandsComponent } from './components/manage/brands/brands.component';
import { BrandFormComponent } from './components/manage/brand-form/brand-form.component';
import { ProductsComponent } from './components/manage/products/products.component';
import { ProductFormComponent } from './components/manage/product-form/product-form.component';
import { UserBrandsComponent } from './components/user-brands/user-brands.component';
import { UserProductsComponent } from './components/user-products/user-products.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'admin/categories', component: CategoriesComponent },
  { path: 'admin/categories/add', component: CategoryFormComponent },
  { path: 'admin/categories/:id', component: CategoryFormComponent },
  { path: 'admin/brands', component: BrandsComponent },
  { path: 'admin/brands/add', component: BrandFormComponent },
  { path: 'admin/brands/:id', component: BrandFormComponent },
  { path: 'admin/products', component: ProductsComponent },
  { path: 'admin/products/add', component: ProductFormComponent },
  { path: 'admin/products/:id', component: ProductFormComponent },
  {
    path: 'user/brands/:id',
    component: UserBrandsComponent,
  },
  {
    path: 'user/products/:id',
    component: UserProductsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
