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
  })),

  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),

  on(ProductAPIActions.productsAddedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product]
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

  on(ProductAPIActions.productsUpdatedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: state.products.map(existedProduct => existedProduct.id === product.id ? product : existedProduct)
  })),

  on(ProductAPIActions.productsUpdatedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: ''
  })),

  on(ProductAPIActions.productsUpdatedSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: state.products.map(existedProduct => existedProduct.id === product.id ? product : existedProduct)
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

  on(ProductAPIActions.productsDeletedSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    products: state.products.filter(product => product.id !== id)
  })),

  on(ProductAPIActions.productsDeletedFail, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message
  })),
);