import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule, provideRouterStore, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { StoreModule, provideStore } from '@ngrx/store';
import { metaReducers, reducers, routerFeatureKey } from './reducers';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouterStore({
      stateKey: routerFeatureKey,
      routerState: RouterState.Minimal,
    }),
    provideEffects(),
    provideAnimationsAsync(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: isDevMode(),
    }),
    importProvidersFrom([
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
    ]),
  ],
};
