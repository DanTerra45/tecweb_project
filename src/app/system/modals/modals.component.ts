import { Component, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.less']
})

export class ModalsComponent {
  @Input() product: any;
  constructor(public active_modal: NgbActiveModal, private product_service: ProductsService) {}
  save() 
  {
    if (this.product._id) {
      this.product_service.edit_product(this.product).subscribe(
        (response) => 
        {
          console.log(response);
          this.active_modal.close('save');
        },
        (error) => 
        {
          console.error(error);
        }
      );
    }
    else {
      this.product_service.add_product(this.product).subscribe(
        (response) => 
        {
          console.log(response);
          this.active_modal.close('save');
        },
        (error) => 
        {
          console.error(error);
        }
      );
    }
  }
}