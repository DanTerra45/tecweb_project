import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './pages/start/start.component';
import { GetProductsComponent } from './pages/products/methods/get-products/get-products.component';
import { AddProductComponent } from './pages/products/methods/add-product/add-product.component';
import { EditProductComponent } from './pages/products/methods/edit-product/edit-product.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full' },
  {path: 'start', component: StartComponent},
  {path: 'get-products', component: GetProductsComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'edit-product', component: EditProductComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}