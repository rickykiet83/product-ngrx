import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Product } from '../product.model';
import { Update } from '@ngrx/entity';

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Update Product': props<{ product: Product }>(),
    'Delete Product': props<{ id: number }>(),
  }
});

export const ProductAPIActions = createActionGroup({
  source: 'Products API',
  events: {
    'Products Loaded Success': props<{ products: Product[] }>(),
    'Products Loaded Fail': props<{ message: string }>(),
    'Products Added Success': props<{ product: Product }>(),
    'Products Added Fail': props<{ message: string }>(),
    'Products Updated Success': props<{ update: Update<Product> }>(),
    'Products Updated Fail': props<{ message: string }>(),
    'Products Deleted Success': props<{ id: number }>(),
    'Products Deleted Fail': props<{ message: string }>(),
  }
});