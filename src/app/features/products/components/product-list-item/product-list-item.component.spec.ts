import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListItemComponent } from './product-list-item.component';
import products from '../../../../../data/products.json';
import { Product } from '../../models/product.model';

describe('ProductListItemComponent', () => {
  let component: ProductListItemComponent;
  let fixture: ComponentFixture<ProductListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;
    component.product = products[0] as Product;
    fixture.detectChanges();
  });

  it('display product item', () => {
    expect(component).toBeTruthy();
  });
});
