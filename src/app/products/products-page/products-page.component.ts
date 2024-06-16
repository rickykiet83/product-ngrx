import { selectLoading, selectProducts, selectProductsTotal, selectShowProductCode } from '../state/products.selector';

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
  errorMessage = '';

  constructor(private store: Store) {
    this.store.subscribe(store => console.log(store));
  }

  ngOnInit() {
    this.store.dispatch(ProductsPageActions.loadProducts());
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
