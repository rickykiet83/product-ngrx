import { Component, OnInit } from '@angular/core';
import { selectProducts, selectProductsErrorMessage, selectProductsLoading, selectProductsShowProductCode, selectProductsTotal } from '../state/products.selector';

import { ProductsPageActions } from '../state/products.action';
import { ProductsStore } from '../products.store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: [ProductsStore]
})
export class ProductsPageComponent implements OnInit {
  // products$ = this.store.select(selectProducts);
  // products$ = this.productsStore.products$;
  products = this.store.selectSignal(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectProductsShowProductCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(
    private store: Store,
    private productsStore: ProductsStore) {
    this.store.subscribe((store) => console.log({ store }));
  }

  ngOnInit() {
    this.productsStore.getProducts();
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
