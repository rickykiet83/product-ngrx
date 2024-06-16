import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { productsReducer } from './state/products.reducer';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsListComponent,
    ProductEditComponent,
    ProductPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('products', productsReducer),
  ],
})
export class ProductsModule { }
