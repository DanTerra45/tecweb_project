import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.less']
})
export class AddProductComponent {
  constructor(private product_service: ProductsService) {}
  add_product(product_data: any) 
  {
    this.product_service.add_product(product_data).subscribe(
      response => console.log('Product added!', response),
      error => console.error('There was an error.', error)
    );
  }
}