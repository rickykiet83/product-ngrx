import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductAPIActions, ProductsPageActions } from './products.action';
import { catchError, concatMap, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ProductsService } from '../products.service';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductsService) { }

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsPageActions.loadProducts),
    concatMap(() => this.productService
      .getAll()
      .pipe(
        map(products =>
          ProductAPIActions.productsLoadedSuccess({ products })
        ),
        catchError(error => of(ProductAPIActions.productsLoadedFail({ message: error }))
        )
      )
    )));
}
