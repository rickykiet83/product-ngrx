import { createAction, createReducer, on } from '@ngrx/store';

export interface ProductsState {
  showProductCode: boolean
}

const initialState: ProductsState = {
  showProductCode: false
};

export const productsReducer = createReducer<ProductsState>(
  initialState,
  on(createAction('[Product] Toggle Product Code'), state => ({
    ...state,
    showProductCode: !state.showProductCode
  }))
);