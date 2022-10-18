import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-product-list',
  templateUrl: './cart-product-list.component.html',
  styleUrls: ['./cart-product-list.component.css']
})
export class CartProductListComponent implements OnInit {

  @Input() products: CartItem[] = [];
  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

}
