import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './pages/products/methods/add-product/add-product.component';
import { GetProductsComponent } from './pages/products/methods/get-products/get-products.component';
import { StartComponent } from './pages/start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    GetProductsComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
