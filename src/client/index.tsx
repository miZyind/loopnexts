// Node module
import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { whyDidYouUpdate } from 'why-did-you-update';
import { registerObserver } from 'react-perf-devtool';
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
// Devtool
if (isDev) {
  // React Performance Devtool
  registerObserver();
  // Why Did You Update Devtool
  whyDidYouUpdate(React);
}
const reduxDevtoolEnhancer = isDev
  ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  : undefined;
const Component = isDev ? App : hot(module)(App);
// Store
const store = createStore(rootReducer, reduxDevtoolEnhancer);

render(
  <Provider store={store}>
    <Component name={name} version={version} />
  </Provider>,
  document.getElementById('root')
);
