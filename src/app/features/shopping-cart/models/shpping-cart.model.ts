import { CartItem } from "./cart-item.model";

export class ShoppingCart {
    cartItems : CartItem[];
    voucherDiscount : number;
    categoryDiscount: number;
    subTotal: number;

constructor(){
    this.cartItems = [];
    this.voucherDiscount = 0;
    this.categoryDiscount = 0;
    this.subTotal = 0;
}
}