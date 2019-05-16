// Node module
import getConfig from 'next/config';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
// Reducer
import rootReducer from './reducers';
// Model
import { IStore } from './models';

const { isDev } = getConfig().publicRuntimeConfig;

function configureStore(initialState = {}) {
  // Middleware
  const epicMiddleware = createEpicMiddleware();
  const middlewares = [epicMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  // Enhancer
  const composedEnhancers = isDev
    ? composeWithDevTools(middleWareEnhancer)
    : middleWareEnhancer;
  // Store
  return createStore(rootReducer, initialState, composedEnhancers);
}

export type Store = ReturnType<typeof getOrCreateStore>;
export type State = IStore;
export default function getOrCreateStore(
  state = {},
): ReturnType<typeof configureStore> {
  if (typeof window === 'undefined') {
    return configureStore(state);
  }

  if (!window.__NEXT_REDUX_STORE__) {
    window.__NEXT_REDUX_STORE__ = configureStore(state);
  }
  return window.__NEXT_REDUX_STORE__;
}
