import { AsyncPipe, NgIf } from '@angular/common';
import { selectProductById, selectProductsLoading } from '../state/products.selector';

import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductsPageActions } from '../state/products.action';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  selector: 'app-product-page',
  imports: [NgIf, ProductEditComponent, AsyncPipe],
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  product$ = this.store.select(selectProductById);
  loading$ = this.store.select(selectProductsLoading);

  constructor(
    private store: Store
  ) { }

  addProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.addProduct({ product }));
  }

  updateProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.updateProduct({ product }));
  }

  deleteProduct(id: number) {
    this.store.dispatch(ProductsPageActions.deleteProduct({ id }));
  }
}
