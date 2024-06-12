import { Injectable } from '@angular/core';
import axios from 'axios';
import { ProductInterface } from './product-interface';
import { HttpClient } from '@angular/common/http';
import { Observable, from, map, tap } from 'rxjs';
const api = "http://localhost:5000/api/products"
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  async getProductList(url: string): Promise<ProductInterface[]> {
    const response = await axios.get(url);
    return response.data || [];
  }
  async getProductByID(url: string): Promise<ProductInterface> {
    const response = await axios.get(url);
    return response.data || {};
  }
  async getCategories(url: string): Promise<any> {
    const response = await axios.get(url);
    return response.data || [];
  }

  constructor(private http: HttpClient) { }
  private cart: any = [];
  addProduct(product:ProductInterface, quantity: number){
      const index = this.cart.findIndex((item:ProductInterface)=> item.id === product.id);
      if(index == -1){
        this.cart.push({...product, quantity})
      }else{
        this.cart[index].quantity += quantity;
      }
  }
  getCartLength(){
    let item = 0;
    for(let p of this.cart){
      item += p.quantity;
    }
    return item
  }

  getProductSearch(name: string): Observable<ProductInterface[]> {
    return from(this.getProductList(api)).pipe(
      map(products => products.filter(product => product.name.toLowerCase().includes(name.toLowerCase())))
    );
  }

}
