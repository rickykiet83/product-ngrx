import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { isDevMode } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';

export const routerFeatureKey = 'router';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState { }

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = isDevMode()
  ? [logger]
  : [];
