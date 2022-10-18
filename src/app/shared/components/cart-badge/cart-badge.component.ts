import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'cart-badge',
  templateUrl: './cart-badge.component.html',
  styleUrls: ['./cart-badge.component.css']
})
export class CartBadgeComponent implements OnInit {

  public totalItem: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCart()
      .subscribe(res => {
        this.totalItem = res.cartItems.reduce((accumulator, item) => {
          return accumulator + item.quantity;
        }, 0);
      })
  }

}
