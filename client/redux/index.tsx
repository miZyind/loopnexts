// Node module
import React from 'react';
import {
  AppComponentType,
  AppProps,
  DefaultAppIProps,
  NextAppContext,
} from 'next/app';
// Store
import configureStore from './store';

type Store = ReturnType<typeof getOrCreateStore>;
export interface IReduxProps {
  reduxStore: Store;
  initialReduxState?: any;
}
type WrappedAppProps = IReduxProps & DefaultAppIProps;
type NextReduxAppProps = WrappedAppProps & AppProps;
type NextReduxAppContext = NextAppContext & { ctx: IReduxProps };

function getOrCreateStore(
  initialState = {},
): ReturnType<typeof configureStore> {
  if (typeof window === 'undefined') {
    return configureStore(initialState);
  }

  if (!window.__NEXT_REDUX_STORE__) {
    window.__NEXT_REDUX_STORE__ = configureStore(initialState);
  }
  return window.__NEXT_REDUX_STORE__;
}

export default <P extends {}>() =>
  function withReduxStore(App: AppComponentType<WrappedAppProps & P>) {
    return class extends React.Component<NextReduxAppProps & P> {
      public static async getInitialProps(appContext: NextReduxAppContext) {
        appContext.ctx.reduxStore = getOrCreateStore();

        const appProps = App.getInitialProps
          ? await App.getInitialProps(appContext)
          : {};

        return {
          ...appProps,
          initialReduxState: appContext.ctx.reduxStore.getState(),
        };
      }
      private reduxStore: Store;

      constructor(props: NextReduxAppProps & P) {
        super(props);
        this.reduxStore = getOrCreateStore(props.initialReduxState);
      }

      public render() {
        return <App reduxStore={this.reduxStore} {...this.props} />;
      }
    };
  };
