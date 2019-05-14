// Node module
import React from 'react';
import {
  AppComponentType,
  AppProps,
  DefaultAppIProps,
  NextAppContext,
} from 'next/app';
import { I18nextProvider } from 'react-i18next';

export interface II18nProps {
  initialLanguage: any;
  initialI18nStore: any;
  i18nServerInstance: any;
}
type WrappedAppProps = II18nProps & DefaultAppIProps;
type NextI18nAppProps = WrappedAppProps & AppProps;

export default <P extends {}>() =>
  function withI18next(App: AppComponentType<WrappedAppProps & P>) {
    return class extends React.Component<NextI18nAppProps & P> {
      public static async getInitialProps(appContext: NextAppContext) {
        const appProps = App.getInitialProps
          ? await App.getInitialProps(appContext)
          : {};
        return { ...appProps };
      }

      public render() {
        const {
          initialLanguage,
          initialI18nStore,
          i18nServerInstance,
        } = this.props;

        return (
          <I18nextProvider i18n={i18nServerInstance}>
            <App {...this.props} />
          </I18nextProvider>
        );
      }
    };
  };
