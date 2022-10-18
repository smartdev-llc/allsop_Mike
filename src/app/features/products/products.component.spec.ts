import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import products from '../../../data/products.json';
import { Product } from 'src/app/features/products/models/product.model';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from 'src/app/shared/pipe/filter.pipe';
import { CartService } from 'src/app/shared/services/cart.service';
import { ShoppingCart } from '../shopping-cart/models/shpping-cart.model';

describe('Product Test Case', () => {
  let component: ProductsComponent;
  let cartService: CartService;
  let fixture: ComponentFixture<ProductsComponent>;
  let listProduct: Product[] = products as Product[];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ProductsComponent, FilterPipe],
      providers: [ApiService, CartService, HttpClientModule, FilterPipe]
    })
      .compileComponents();
    localStorage.setItem('card', JSON.stringify(new ShoppingCart()));
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    component.productList = products as Product[];
    fixture.detectChanges();
  });

  it('load product from api', () => {
    expect(component.productList.length).toEqual(20);
  })
  it('unable to Out of Stock products to the shopping cart', () => {
    cartService = new CartService();
    const product = listProduct.filter(s => s.qty == 0)[0];
    expect(cartService.addToCart(product)).toBeFalse();
  })
  it('not allow to add product to shopping cart with quantity greater then product quantity', () => {
    cartService = new CartService();
    cartService.addToCart(listProduct[10]);
    cartService.addToCart(listProduct[11]);
    cartService.getCart().subscribe(cart => {
      expect(cart.cartItems.length).toEqual(2);
    })

  })
  it('can add a product to my shopping cart.', () => {
    cartService = new CartService();
    cartService.addToCart(listProduct[0]);
    cartService.getCart().subscribe(s => {
      expect(s.cartItems.length).toEqual(1);
    })

  })
  it('can remove a product from my shopping cart.', () => {
    cartService = new CartService();
    const product = listProduct[0];
    cartService.addToCart(product);
    cartService.removeCartItem(product);
    cartService.getCart().subscribe(s => {
      expect(s.cartItems.length).toEqual(0);
    })
  })

});
