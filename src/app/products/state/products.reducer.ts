import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ProductsAPIActions, ProductsPageActions } from './products.action';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Product } from '../product.model';

export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
  // ids: string[] | number[];
  // entities: Dictionary<T>;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialState: ProductsState = adapter.getInitialState({
  showProductCode: true,
  loading: false,
  errorMessage: '',
  // ids: string[] | number[];
  // entities: Dictionary<T>;
});

export const productsFeature = createFeature({
  name: 'products',
  reducer: createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
      ...state,
      showProductCode: !state.showProductCode,
    })),
    on(ProductsPageActions.loadProducts, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })),
    on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) =>
      adapter.addMany(products, {
        ...state,
        loading: false,
      })
    ),
    on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
      ...state,
      loading: false,
      errorMessage: message,
    })),
    on(ProductsPageActions.addProduct, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })),
    on(ProductsAPIActions.productAddedSuccess, (state, { product }) =>
      adapter.addOne(product, {
        ...state,
        loading: false,
      })
    ),
    on(ProductsAPIActions.productAddedFail, (state, { message }) => ({
      ...state,
      loading: false,
      errorMessage: message,
    })),
    on(ProductsPageActions.updateProduct, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })),
    on(ProductsAPIActions.productUpdatedSuccess, (state, { update }) =>
      adapter.updateOne(update, {
        ...state,
        loading: false,
      })
    ),
    on(ProductsAPIActions.productUpdatedFail, (state, { message }) => ({
      ...state,
      loading: false,
      errorMessage: message,
    })),
    on(ProductsPageActions.deleteProduct, (state) => ({
      ...state,
      loading: true,
      errorMessage: '',
    })),
    on(ProductsAPIActions.productDeletedSuccess, (state, { id }) =>
      adapter.removeOne(id, {
        ...state,
        loading: false,
      })
    ),
    on(ProductsAPIActions.productDeletedFail, (state, { message }) => ({
      ...state,
      loading: false,
      errorMessage: message,
    }))
  ),
});

export const { selectAll, selectEntities } = adapter.getSelectors();

export const selectProducts = selectAll;
export const selectProductsEntities = selectEntities;
