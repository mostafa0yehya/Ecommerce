import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get(
      'https://ecommerce.routemisr.com/api/v1/products'
    );
  }
    getProductDetails(id:string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

   productDiscount(product: Product) {
    if (product.priceAfterDiscount) {
      const discount =
        ((product.price - product.priceAfterDiscount) / product.price) * 100;
      return Math.round(discount);
    } else {
      return 0;
    }
  }
}
