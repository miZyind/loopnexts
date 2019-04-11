// Node module
import getConfig from 'next/config';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
// Reducer
import rootReducer from './reducers';

const { isDev } = getConfig().publicRuntimeConfig;

export default function configureStore(initialState = {}) {
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
