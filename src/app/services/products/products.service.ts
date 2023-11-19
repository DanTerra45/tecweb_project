import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}