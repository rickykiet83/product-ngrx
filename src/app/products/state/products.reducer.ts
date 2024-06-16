import { ProductAPIActions, ProductsPageActions } from './products.action';
import { createReducer, on } from '@ngrx/store';

import { Product } from '../product.model';

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

const initialState: ProductsState = {
  showProductCode: false,
  loading: false,
  products: [],
  errorMessage: ''
};

export const productsReducer = createReducer<ProductsState>(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, state => ({
    ...state,
    showProductCode: !state.showProductCode
  })),

  on(ProductsPageActions.loadProducts, state => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),

  on(ProductAPIActions.productsLoadedSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products
  })),

  on(ProductAPIActions.productsLoadedFail, (state, { message }) => ({
    ...state,
    products: [],
    errorMessage: message,
    loading: false
  }))
);