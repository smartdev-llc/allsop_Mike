import { NgModule } from '@angular/core';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { ProductsComponent } from './products.component';
import { CommonModule } from '@angular/common';
import { FilterPipe } from 'src/app/shared/pipe/filter.pipe';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListItemComponent,
    FilterPipe
  ],
  imports: [CommonModule],
  exports: [
    ProductListItemComponent,
    ProductsComponent
  ]
})
export class ProductsModule { }