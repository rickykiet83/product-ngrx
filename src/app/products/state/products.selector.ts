import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState } from './products.reducer';
import { getRouterSelectors } from '@ngrx/router-store';
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

export const { selectRouteParams } = getRouterSelectors();

export const selectProductById = createSelector(
  selectRouteParams,
  selectProductsState,
  ({ id }, { products }) =>
    products.find((product) => product.id === parseInt(id))
);
