import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/features/shopping-cart/models/cart-item.model';
import { Voucher } from 'src/app/features/shopping-cart/models/voucher.model';
import { ApiService } from 'src/app/core/services/api.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { constants } from 'src/app/core/constants/constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products : CartItem[] = [];
  public subTotal !: number;
  public grandTotal !: number;
  public disscount : number =0;
  public voucherDiscount : number =0;
  public voucherList: Voucher[] = [];
  public voucher: string = "";

  constructor(private apiService : ApiService,private cartService : CartService) { }

  ngOnInit(): void {
    this.initData();
  }
  initData()
  {
    this.cartService.getCart().subscribe((res)=> {
      this.products = res.cartItems;
      this.subTotal = res.subTotal;
      this.grandTotal = this.subTotal;
      this.initDiscountData();
    });
  }
  initDiscountData()
  {
    this.grandTotal = this.subTotal;
    this.apiService.getVoucher().subscribe((items)=>{
      if (items)
        this.voucherList =  items;
        this.checkDiscount();
    });
  }

  checkDiscount()
  {
    var _categoryDiscount = 0;
    this.voucherList.forEach(item=>{
      _categoryDiscount = _categoryDiscount + this.checkItemDiscount(item);
    });
    this.disscount = _categoryDiscount;
  }

  checkItemDiscount(item: Voucher)
  {
    let discountAmount = 0;
    if (item.type == constants.VOURCHER_TYPE.CATEGORY)
    {
      let result = this.getProductCardVoucherByCategory(item.category);
      if (item.qty != null && result.qty >= item.qty)
        discountAmount = item.discount != null ? item.discount : (result.amount * item.discount_percent) / 100;
      else if (item.amount != null && result.amount >= item.amount)
        discountAmount = item.discount != null ? item.discount : (result.amount * item.discount_percent) / 100;
            else if (item.amount == null && item.qty == null) discountAmount = item.discount != null ? item.discount : (result.amount * item.discount_percent) / 100;
    }
    return discountAmount;
  }

  getProductCardVoucherByCategory(name: string)
  {
    let qty = 0;
    let amount = 0;
    this.products.filter(s=>s.category == name).map((item:CartItem)=>{
      qty += item.quantity
      amount += item.quantity * item.price
    })
    return {qty : qty,amount :amount};
  }

  applyVoucher()
  {
    const voucherCodeItem =  this.voucherList.filter(s=>s.type == constants.VOURCHER_TYPE.CODE && s.code == this.voucher)[0];
    if (voucherCodeItem && this.subTotal >= voucherCodeItem.amount)
      this.voucherDiscount = voucherCodeItem.discount;
    else {
      Swal.fire({
        text: "Voucher code invalid",
        icon: "error"
      })
    }
  }
}
