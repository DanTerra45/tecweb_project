import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProductComponent } from './pages/products/methods/add-product/add-product.component';
import { GetProductsComponent } from './pages/products/methods/get-products/get-products.component';
import { StartComponent } from './pages/start/start.component';
import { EditProductComponent } from './pages/products/methods/edit-product/edit-product.component';
import { InterceptorService } from './services/web-interceptor/interceptor.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ModalsComponent } from './system/modals/modals.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    GetProductsComponent,
    StartComponent,
    EditProductComponent,
    LoginComponent,
    RegisterComponent,
    ModalsComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}