// Node module
import React from 'react';
import App, { NextAppContext } from 'next/app';
// Redux
import configureStore from './store';

type Store = ReturnType<typeof getOrCreateStore>;
type NextApp<P> = React.ComponentType<P> & {
  getInitialProps: typeof App.getInitialProps;
};
export interface IProps {
  reduxStore: Store;
  initialReduxState?: any;
}
type NextReduxAppContext = NextAppContext & { ctx: IProps };

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

export function withReduxStore<P extends IProps>(Component: NextApp<P>) {
  return class extends React.Component<P> {
    public static async getInitialProps(appContext: NextReduxAppContext) {
      const reduxStore = getOrCreateStore();

      appContext.ctx.reduxStore = reduxStore;

      const appProps = Component.getInitialProps
        ? await Component.getInitialProps(appContext)
        : {};


      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }
    private reduxStore: Store;

    constructor(props: P) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    public render() {
      return <Component {...this.props} reduxStore={this.reduxStore} />;
    }
  };
}
