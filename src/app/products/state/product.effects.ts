import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductAPIActions, ProductsPageActions } from './products.action';
import { catchError, concatMap, exhaustMap, map, mergeMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ProductsService } from '../products.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductsService) { }

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsPageActions.loadProducts),
    exhaustMap(() => this.productService
      .getAll()
      .pipe(
        map(products =>
          ProductAPIActions.productsLoadedSuccess({ products })
        ),
        catchError(error => of(ProductAPIActions.productsLoadedFail({ message: error }))
        )
      )
    )));

  addProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsPageActions.addProduct),
    mergeMap(({ product }) => this.productService
      .add(product)
      .pipe(
        map(newProduct =>
          ProductAPIActions.productsAddedSuccess({ product: newProduct })
        ),
        catchError(error => of(ProductAPIActions.productsAddedFail({ message: error }))
        )
      )
    )));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsPageActions.updateProduct),
    concatMap(({ product }) => this.productService
      .update(product)
      .pipe(
        map(product =>
          ProductAPIActions.productsAddedSuccess({ product })
        ),
        catchError(error => of(ProductAPIActions.productsUpdatedFail({ message: error }))
        )
      )
    )));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsPageActions.deleteProduct),
    mergeMap(({ id }) => this.productService
      .delete(id)
      .pipe(
        map(() =>
          ProductAPIActions.productsDeletedSuccess({ id })
        ),
        catchError(error => of(ProductAPIActions.productsDeletedFail({ message: error }))
        )
      )
    )));
}
