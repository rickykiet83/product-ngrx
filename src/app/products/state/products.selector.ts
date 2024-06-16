import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState } from './products.reducer';
import { sumProducts } from 'src/app/utils/sum-products';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.products
);

export const selectLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading
);

export const selectShowProductCode = createSelector(
  selectProductsState,
  (productsState) => productsState.showProductCode
);

export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  (productsState) => productsState.errorMessage
);

export const selectProductsTotal = createSelector(selectProducts, sumProducts);
