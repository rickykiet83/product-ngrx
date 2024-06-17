import { Component, OnInit } from '@angular/core';
import { selectProducts, selectProductsErrorMessage, selectProductsLoading, selectProductsShowProductCode, selectProductsTotal } from '../state/products.selector';

import { NgIf } from '@angular/common';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ProductsPageActions } from '../state/products.action';
import { ProductsStore } from '../products.store';
import { Store } from '@ngrx/store';

@Component({
  standalone: true,
  imports: [NgIf, ProductsListComponent],
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: [ProductsStore]
})
export class ProductsPageComponent implements OnInit {
  products = this.store.selectSignal(selectProducts);
  total = this.store.selectSignal(selectProductsTotal);
  showProductCode = this.store.selectSignal(selectProductsShowProductCode);
  loading = this.store.selectSignal(selectProductsLoading);
  errorMessage = this.store.selectSignal(selectProductsErrorMessage);

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
