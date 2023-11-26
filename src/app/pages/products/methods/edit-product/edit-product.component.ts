import { Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/services/products/products.modal';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.less']
})

export class EditProductComponent implements OnInit{
  @Input() product_to_edit!: Product;
  constructor(public activeModal: NgbActiveModal, private product_service: ProductsService) {}
  ngOnInit(): void 
  {
    if (Array.isArray(this.product_to_edit.categories)) 
    {
      this.product_to_edit.categories = this.product_to_edit.categories.join(', ');
    }
  }
  edit_product() 
  {
    if (typeof this.product_to_edit.categories === 'string') 
    {
      this.product_to_edit.categories = this.product_to_edit.categories.split(', ').map((character: string) => character.trim());
    }
    this.product_service.edit_product(this.product_to_edit).subscribe(
      (response) => 
      {
        console.log('Product updated!', response);
        this.activeModal.close('save');
      },
      (error) => 
      {
        console.error('Error updating product: ', error);
      }
    );
  }
}