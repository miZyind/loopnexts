// Node module
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { createStore, compose } from 'redux';
// Reducer
import rootReducer from '@reducers/index';
// Style
import 'semantic-ui-css/semantic.min.css';
// Container
import App from '@containers/app';

// Env
const isDev = process.env.NODE_ENV !== 'production';
const name = process.env.APP_NAME!;
const version = process.env.APP_VERSION!;

/* tslint:disable:no-var-requires */
// Devtools
if (isDev) {
  require('react-perf-devtool').registerObserver(); // React Performance Devtool
  // require('why-did-you-update').whyDidYouUpdate(React); // Why Did You Update Devtool
}
/* tslint:enable:no-var-requires */

// Store
const composeEnhancers = isDev ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const store = createStore(rootReducer, composeEnhancers());
const Component = isDev ? hot(module)(App) : App;

render(
  <Provider store={store}>
    <Component name={name} version={version} />
  </Provider>,
  document.getElementById('root')
);
