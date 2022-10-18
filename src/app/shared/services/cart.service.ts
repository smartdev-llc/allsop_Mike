import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../features/shopping-cart/models/cart-item.model';
import { Product } from '../../features/products/models/product.model';
import { ShoppingCart } from 'src/app/features/shopping-cart/models/shpping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItem = new BehaviorSubject<ShoppingCart>(new ShoppingCart());

  constructor() {
    this.cartItem.next(JSON.parse(localStorage.getItem('card') || JSON.stringify(new ShoppingCart())));
  }

  getCart() {
    this.cartItem.next(JSON.parse(localStorage.getItem('card') || JSON.stringify(new ShoppingCart())));
    return this.cartItem.asObservable();
  }

  addToCart(product: Product): boolean {
    if (product.qty < 1) return false;
    var _shoppingCart = this.cartItem.value;
    var _cart = this.cartItem.value.cartItems;
    var cartItem = _cart.find(s => s.product_id == product.id);
    if (cartItem === undefined) {
      _cart.push({
        product_id: product.id,
        product_image: product.image,
        product_name: product.title,
        quantity: 1,
        category: product.category,
        price: product.price_discount != null ? product.price_discount : product.price
      });
    }
    else {
      if (cartItem.quantity + 1 > product.qty)
        return false;
      else cartItem.quantity++;
    }
    _shoppingCart.cartItems = _cart;
    _shoppingCart.subTotal = this.getTotalPrice(_cart);
    this.cartItem.next(_shoppingCart);

    this.syncItems();
    return true;
  }

  getTotalPrice(items: CartItem[]): number {
    let total = 0;
    items.map((a: CartItem) => {
      total += a.price * a.quantity;
    })
    return total;
  }

  removeCartItem(product: any) {
    var _shoppingCart = this.cartItem.value;
    var _cart = _shoppingCart.cartItems;

    _cart.map((item: CartItem, index: any) => {
      if (product.product_id === item.product_id || product.id == item.product_id) {
        _cart.splice(index, 1);
      }
    });
    _shoppingCart.cartItems = _cart;
    _shoppingCart.subTotal = this.getTotalPrice(_cart);

    this.cartItem.next(_shoppingCart);
    this.syncItems();
  }
  removeAllCart() {
    this.cartItem.next(new ShoppingCart());
    this.syncItems();
  }


  syncItems() {
    localStorage.setItem('card', JSON.stringify(this.cartItem.value)); // sync the data
  }
}