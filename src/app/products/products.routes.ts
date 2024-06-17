import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsPageComponent } from './products-page/products-page.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
  },
  {
    path: ':id',
    component: ProductPageComponent,
  },
];
