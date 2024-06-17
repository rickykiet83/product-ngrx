import { Actions, OnInitEffects, createEffect, ofType } from '@ngrx/effects';
import { ProductAPIActions, ProductsPageActions } from './products.action';
import { catchError, concatMap, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class ProductEffects implements OnInitEffects {

  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsPageActions.loadProducts),
    exhaustMap(() => this.productsService
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
    mergeMap(({ product }) => this.productsService
      .add(product)
      .pipe(
        map(newProduct =>
          ProductAPIActions.productsAddedSuccess({ product: newProduct })
        ),
        catchError(error => of(ProductAPIActions.productsAddedFail({ message: error }))
        )
      )
    )));

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map(() => ProductAPIActions.productsUpdatedSuccess({ product })),
          catchError((error) =>
            of(ProductAPIActions.productsUpdatedFail({ message: error }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsPageActions.deleteProduct),
    mergeMap(({ id }) => this.productsService
      .delete(id)
      .pipe(
        map(() =>
          ProductAPIActions.productsDeletedSuccess({ id })
        ),
        catchError(error => of(ProductAPIActions.productsDeletedFail({ message: error }))
        )
      )
    )));

  redirectToProductsPage = createEffect(
    () => this.actions$.pipe(
      ofType(
        ProductAPIActions.productsAddedSuccess,
        ProductAPIActions.productsUpdatedSuccess,
        ProductAPIActions.productsDeletedSuccess
      ),
      tap(() => this.router.navigate(['/products']))),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private router: Router
  ) { }
}
