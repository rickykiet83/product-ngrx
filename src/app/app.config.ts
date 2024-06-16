import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { RouterState, StoreRouterConnectingModule, provideRouterStore, routerReducer } from '@ngrx/router-store';
import { StoreModule, provideStore } from '@ngrx/store';
import { metaReducers, reducers, routerFeatureKey } from './reducers';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

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
    provideHttpClient(),
    provideRouterStore({
      stateKey: routerFeatureKey,
      routerState: RouterState.Minimal,
    }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimationsAsync(),
    importProvidersFrom([
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService),
      StoreModule.forRoot({ router: routerReducer }),
      StoreRouterConnectingModule.forRoot(),
      EffectsModule.forRoot([]),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: !isDevMode()
      })
    ]),
  ],
};
