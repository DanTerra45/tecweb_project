import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.less']
})

export class AddProductComponent {
  constructor(public active_modal: NgbActiveModal, private product_service: ProductsService) {}
  add_product(product_to_add: any) 
  {
    product_to_add.categories = product_to_add.categories.split(', ').map((character: string) => character.trim());
    this.product_service.add_product(product_to_add).subscribe(
      response => 
      {
        console.log(response);
        this.active_modal.close('save');
      },
      error => 
      {
        console.error(error);
      }
    );
  }
}