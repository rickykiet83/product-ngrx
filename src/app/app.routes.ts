import { HomeComponent } from './home/home.component';
import { ProductEffects } from './products/state/product.effects';
import { ProductsService } from './products/products.service';
import { Route } from '@angular/router';
import { productsFeature } from './products/state/products.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.routes').then((mod) => mod.routes),
    providers: [
      ProductsService,
      provideState(productsFeature),
      provideEffects(ProductEffects),
    ],
  },
];
