import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/services/products/products.modal';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.less']
})

export class GetProductsComponent implements OnInit{
  products: Product[] = [];
  constructor(private product_service: ProductsService, private modal_service: NgbModal) {}
  ngOnInit(): void {
    this.product_service.get_products().subscribe(
      (data) => 
      {
        this.products = data;
      },
      (error) => 
      {
        console.error('Error fetching the products from the database.', error)
      }
    )
  }
  open_add_modal() {
    const modalRef = this.modal_service.open(AddProductComponent);
    modalRef.componentInstance.product = {};
    modalRef.result.then(
      (result) => 
      {
        if (result === 'save') 
        {
          this.product_service.get_products().subscribe(
            (updated_data) => 
            {
              this.products = updated_data;
            },
            (error) => 
            {
              console.error('Error fetching the products after adding a new one.', error);
            }
          );
        }
      },
      (reason) => 
      {
        console.log('Modal (AddProduct) dismissed with reason:', reason);
      }
    );
  }
  open_edit_modal(product: Product) {
    const modalRef = this.modal_service.open(EditProductComponent);
    modalRef.componentInstance.product_to_edit = {...product};
    modalRef.result.then(
      (result) => 
      {
        if (result === 'save') 
        {
          this.product_service.get_products().subscribe(
            (updated_data) => 
            {
              this.products = updated_data;
            },
            (error) => 
            {
              console.error('Error fetching the products after updating one.', error);
            }
          );
        }
      },
      (reason) => 
      {
        console.log('Modal (EditProduct) dismissed with reason:', reason);
      }
    );
  }
  delete_product(product_id: string) {
    if (confirm('Are you sure you want to delete this product?'))
    {
      this.product_service.delete_product(product_id).subscribe(
        () => 
        {
          this.products = this.products.filter(product => product._id !== product_id);
        },
        (error) => 
        {
          console.error('Error deleting this product.', error);
        }
      );
    }
  }
}