import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { CartComponent } from './features/shopping-cart/cart.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CartBadgeComponent } from './shared/components/cart-badge/cart-badge.component';
import { ProductsModule } from './features/products/products.module';
import { CartProductListComponent } from './features/shopping-cart/components/cart-product-list/cart-product-list.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    HeaderComponent,
    CartBadgeComponent,
    CartProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    [SweetAlert2Module.forRoot()],
  ],
  providers: [ProductsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
