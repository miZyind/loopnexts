// Node module
import React from 'react';
import {
  AppComponentType,
  DefaultAppIProps,
  AppProps,
  NextAppContext,
} from 'next/app';
import { NextContext } from 'next';
import { Provider } from 'react-redux';
// Redux
import getOrCreateStore, { Store, State } from '../redux/store';

type AppCtx = NextAppContext & {
  ctx: NextContext & { store: Store };
};

export interface IReduxProps {
  store: Store;
  state: State;
}

export default <P extends DefaultAppIProps & AppProps>() =>
  function withRedux(App: AppComponentType<P>) {
    return class extends React.Component<P & IReduxProps> {
      public static async getInitialProps(appCtx: AppCtx) {
        appCtx.ctx.store = getOrCreateStore();
        const appProps = App.getInitialProps
          ? await App.getInitialProps(appCtx)
          : {};

        return {
          state: appCtx.ctx.store.getState(),
          ...appProps,
        };
      }

      private store = getOrCreateStore(this.props.state);

      public render() {
        return (
          <Provider store={this.store!}>
            <App {...this.props} />
          </Provider>
        );
      }
    };
  };
