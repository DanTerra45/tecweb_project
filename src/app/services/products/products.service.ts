import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './products.modal';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private api_url = 'http://localhost:5000';
  constructor(private http: HttpClient) {}
  get_products(): Observable<any>
  {
    return this.http.get(`${this.api_url}/products`);
  }
  add_product(product_data: any): Observable<any>
  {
    return this.http.post(`${this.api_url}/add_product`, product_data);
  }
  edit_product(product: Product): Observable<any>
  {
    const {_id, ...update_data} = product;
    return this.http.put(`${this.api_url}/edit_product`, {id: _id, ...update_data});
  }
  delete_product(product_id: string): Observable<any>
  {
    return this.http.post(`${this.api_url}/delete_product`, {id: product_id});
  }
}