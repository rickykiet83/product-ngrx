import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ProductAPIActions, ProductsPageActions } from './products.action';
import { createReducer, on } from '@ngrx/store';

import { Product } from '../product.model';

export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialState: ProductsState = adapter.getInitialState({
  showProductCode: false,
  loading: false,
  errorMessage: '',
});

export const productsReducer = createReducer<ProductsState>(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, state => ({
    ...state,
    showProductCode: !state.showProductCode
  })),

  on(ProductsPageActions.loadProducts, state =>
    adapter.setAll([], {
      ...state,
      loading: true,
      errorMessage: ''
    })),

  on(ProductAPIActions.productsLoadedSuccess, (state, { products }) =>
    adapter.setAll(products, {
      ...state,
      loading: false,
    })),

  on(ProductAPIActions.productsLoadedFail, (state, { message }) =>
    adapter.setAll([], {
      ...state,
      errorMessage: message,
      loading: false
    })),

  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),

  on(ProductAPIActions.productsAddedSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      loading: false,
    })),

  on(ProductAPIActions.productsAddedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),

  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),

  on(ProductAPIActions.productsUpdatedSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
      loading: false,
    })),

  on(ProductAPIActions.productsUpdatedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),

  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),

  on(ProductAPIActions.productsDeletedSuccess, (state, { id }) => adapter.removeOne(id, {
    ...state,
    loading: false,
  })),

  on(ProductAPIActions.productsDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
);