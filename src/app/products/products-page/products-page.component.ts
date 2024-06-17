import { selectLoading, selectProducts, selectProductsErrorMessage, selectProductsTotal, selectShowProductCode } from '../state/products.selector';

import { Component } from '@angular/core';
import { ProductsPageActions } from '../state/products.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$ = this.store.select(selectProducts);

  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectLoading);
  showProductCode$ = this.store.select(selectShowProductCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(private store: Store) { }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
