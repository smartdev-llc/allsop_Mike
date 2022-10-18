import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../../features/products/models/category.model';
import { Product } from '../../features/products/models/product.model';
import { Voucher } from '../../features/shopping-cart/models/voucher.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> {
    return this.http.get<any>("/data/products.json")
      .pipe(map((res: Product[]) => {
        return res;
      }))
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<any>("/data/category.json")
      .pipe(map((res: Category[]) => {
        return res;
      }))
  }
  getVoucher(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>("/data/voucher.json")
      .pipe(map((res: Voucher[]) => {
        return res;
      }))
  }
}