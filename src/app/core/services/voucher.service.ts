import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Voucher } from '../../features/shopping-cart/models/voucher.model';
import { ApiService } from './api.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  public listDiscount: Voucher[] = [];
  public discountAmount: number = 0;

  constructor(private api: ApiService, private cartService: CartService) {

  }

  applyVoucher(voucher: string): number {
    const totalPrice = this.cartService.getTotalPrice();
    if (voucher != "20OFFPROMO" || totalPrice < 100) {
      Swal.fire({
        text: "Voucher code invalid",
        icon: "error"
      })
      return 0;
    }
    return 20;
  }

}