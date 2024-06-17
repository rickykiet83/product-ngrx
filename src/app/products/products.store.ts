import { exhaustMap, tap } from 'rxjs';

import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { ProductsService } from './products.service';

export interface ProductsState {
  products: Product[];
};

const initialState: ProductsState = {
  products: []
};

@Injectable()
export class ProductsStore extends ComponentStore<ProductsState> {

  products$ = this.select(state => state.products);

  constructor(private productsService: ProductsService) {
    super(initialState);
  }

  addProducts = this.updater((state: ProductsState, products: Product[]) => ({
    ...state,
    products,
  }));

  getProducts = this.effect((trigger$) =>
    trigger$.pipe(
      exhaustMap(() => this.productsService.getAll().pipe(
        tap({ next: this.addProducts })
      ))
    ));
}
