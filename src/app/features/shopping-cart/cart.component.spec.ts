import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/core/services/api.service';
import { FilterPipe } from 'src/app/shared/pipe/filter.pipe';
import { CartService } from 'src/app/shared/services/cart.service';
import products from '../../../data/products.json';
import vouchers from '../../../data/voucher.json';
import { Product } from '../products/models/product.model';

import { CartComponent } from './cart.component';
import { ShoppingCart } from './models/shpping-cart.model';
import { Voucher } from './models/voucher.model';

describe('Shopping Cart', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;
  let listProduct: Product[] = products as Product[];
  let listVoucher: any[] = vouchers;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CartComponent, FilterPipe],
      providers: [ApiService, HttpClientModule, FilterPipe]
    }).compileComponents();
    localStorage.setItem('card', JSON.stringify(new ShoppingCart()));
    cartService = new CartService();
    var product = listProduct.filter(s => s.category == "Drinks" && s.qty > 10);
    for (var i = 0; i < 10; i++)
      cartService.addToCart(product[0]);

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create shopping card component', () => {
    expect(component).toBeTruthy();
  });
  it('can view the total price for the products in my shopping cart.', () => {
    cartService = new CartService();
    cartService.getCart().subscribe(s => {
      expect(s.subTotal).toEqual(component.subTotal);
    })
  })
  it('can view the total price and discount price for the products in my shopping cart.', () => {
    cartService = new CartService();
    component.voucherList = vouchers as unknown as Voucher[];
    component.checkDiscount();
    console.log(component.disscount);
    cartService.getCart().subscribe(s => {
      expect(component.disscount).toBeGreaterThan(0);
    })
  })
  it('check invalid voucher when add to my shopping cart.', () => {
    cartService = new CartService();
    component.voucherList = vouchers as unknown as Voucher[];
    component.voucher = "123123";
    component.applyVoucher();
    console.log(component.disscount);
    expect(component.voucherDiscount).toEqual(0);
  })
  it('add voucher when add to my shopping cart.', () => {
    cartService = new CartService();
    component.voucherList = vouchers as unknown as Voucher[];
    component.voucher = "20OFFPROMO";
    component.applyVoucher();
    expect(component.voucherDiscount).toEqual(20);
  })

});
