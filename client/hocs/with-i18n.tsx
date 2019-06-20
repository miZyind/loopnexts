// Node module
import React from 'react';
import { I18nextProvider, withSSR, withTranslation } from 'react-i18next';
import {
  AppComponentType,
  DefaultAppIProps,
  AppProps,
  NextAppContext,
} from 'next/app';
// Common
import i18n from '../../common/i18n';

interface II18nStore {
  [lng: string]: { [ns: string]: { [key: string]: string } };
}
interface II18nProps {
  i18nInstance: typeof i18n;
  initialLanguage: typeof i18n.language;
  initialI18nStore: typeof i18n.services.resourceStore;
}
type WrappedProps = DefaultAppIProps & AppProps & II18nProps;

const I18nDetector = withTranslation()(({ children, tReady = true }) =>
  tReady ? <>{children}</> : null,
);

export default function withI18n(App: AppComponentType<DefaultAppIProps>) {
  const WrappedAppWithSSR = withSSR()(App);
  return class extends React.Component<WrappedProps> {
    public static async getInitialProps(ctx: NextAppContext) {
      const appProps = App.getInitialProps
        ? await App.getInitialProps(ctx)
        : { pageProps: {} };
      const { req } = ctx.ctx;
      let i18nInitialProps = {};

      if (req && req.i18n) {
        const namespaces = [i18n.options.defaultNS!];
        const { data } = req.i18n.services.resourceStore;
        req.i18n.toJSON = () => null;
        const initialI18nStore = req.i18n.languages.reduce<II18nStore>(
          (prev, lng) => ({
            ...prev,
            [lng]: namespaces.reduce((prevNs, ns) => {
              const lngData = data[lng];
              return {
                ...prevNs,
                [ns]: lngData && typeof lngData !== 'string' ? lngData[ns] : {},
              };
            }, {}),
          }),
          {},
        );

        i18nInitialProps = {
          i18nInstance: req.i18n,
          initialLanguage: req.i18n.language,
          initialI18nStore,
        };
      }

      return {
        ...appProps,
        ...i18nInitialProps,
      };
    }

    public render() {
      const { i18nInstance, initialLanguage, initialI18nStore } = this.props;

      return (
        <I18nextProvider i18n={i18nInstance || i18n}>
          <I18nDetector>
            <WrappedAppWithSSR
              initialLanguage={initialLanguage}
              initialI18nStore={initialI18nStore}
              {...this.props}
            />
          </I18nDetector>
        </I18nextProvider>
      );
    }
  };
}
