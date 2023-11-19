import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StartComponent } from './pages/start/start.component';
import { GetProductsComponent } from './pages/products/methods/get-products/get-products.component';
import { AddProductComponent } from './pages/products/methods/add-product/add-product.component';

const routes: Routes = [
  {path: 'start', component: StartComponent},
  {path: 'get-products', component: GetProductsComponent},
  {path: 'add-product', component: AddProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}