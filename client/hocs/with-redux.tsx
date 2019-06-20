// Node module
import React from 'react';
import {
  AppComponentType,
  DefaultAppIProps,
  AppProps,
  NextAppContext,
} from 'next/app';
import { Provider } from 'react-redux';
// Redux
import getOrCreateStore, { Store, State } from '../redux/store';

interface IReduxProps {
  store: Store;
  state: State;
}

type WrappedProps = DefaultAppIProps & AppProps & IReduxProps;

export default function withRedux(App: AppComponentType<DefaultAppIProps>) {
  return class extends React.Component<WrappedProps> {
    public static async getInitialProps(ctx: NextAppContext) {
      ctx.ctx.store = getOrCreateStore();
      const appProps = App.getInitialProps
        ? await App.getInitialProps(ctx)
        : { pageProps: {} };

      return {
        ...appProps,
        state: ctx.ctx.store.getState(),
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
}
