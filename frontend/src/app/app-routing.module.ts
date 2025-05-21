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
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddToCartComponent } from './components/add-to-cart/add-to-cart.component';
import { OrderComponent } from './components/order/order.component';
import { HistoryComponent } from './components/history/history.component';
import { DashboardComponent } from './components/manage/dashboard/dashboard.component';
import { UsersComponent } from './components/manage/users/users.component';

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
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'addToCart',
    component: AddToCartComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'admin/users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
