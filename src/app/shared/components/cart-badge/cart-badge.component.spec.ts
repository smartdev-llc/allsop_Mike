import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListItemComponent } from 'src/app/features/products/components/product-list-item/product-list-item.component';
import { CartBadgeComponent } from './cart-badge.component';
import productjson from './../../../../data/products.json'
import { Product } from '../../../features/products/models/product.model'
import { ShoppingCart } from 'src/app/features/shopping-cart/models/shpping-cart.model';

describe('CardBadgeComponent', () => {
  let component: CartBadgeComponent;
  let fixture: ComponentFixture<CartBadgeComponent>;
  let componentProduct: ProductListItemComponent;
  let fixtureProduct: ComponentFixture<ProductListItemComponent>;
  let products = productjson as Product[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartBadgeComponent]
    }).compileComponents();
    localStorage.setItem('card', JSON.stringify(new ShoppingCart()));
    fixture = TestBed.createComponent(CartBadgeComponent);
    fixtureProduct = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;
    componentProduct = fixtureProduct.componentInstance;
    fixture.detectChanges();
  });

  it('check shopping cart badge number with total product of shopping cart', () => {
    componentProduct.addToCart(products[0]);
    componentProduct.addToCart(products[0]);
    expect(component.totalItem).toEqual(2);
  });
});
