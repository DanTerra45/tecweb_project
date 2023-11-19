import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.less']
})
export class GetProductsComponent implements OnInit{
  products: any[] = [];
  constructor(private product_service: ProductsService) {}
  ngOnInit(): void {
    this.product_service.get_products().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching the products from the database.', error)
      }
    )
  }
}