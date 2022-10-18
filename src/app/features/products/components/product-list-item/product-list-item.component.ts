import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import Swal from 'sweetalert2';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent implements OnInit {
  @Input() product: Product;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }
  addToCart(product: Product) {
    if (!this.cartService.addToCart(product)) {
      Swal.fire({
        text: `The maximum allowed quantity for ${product.title} is ${product.qty} (you currently have ${product.qty} in your cart)`,
        icon: 'error'
      })
    }
  }

}
