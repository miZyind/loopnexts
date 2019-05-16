// Node module
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import {
  AppComponentType,
  DefaultAppIProps,
  AppProps,
  NextAppContext,
} from 'next/app';
import { NextContext } from 'next';
// Common
import i18n, { I18n, Language, II18nStore } from '../../common/i18n';

export interface II18nProps {
  i18nInstance: I18n;
  initialLanguage: Language;
  initialI18nStore: II18nStore;
}
type AppCtx = NextAppContext & {
  ctx: NextContext & { req: { i18n: I18n & { toJSON: () => null } } };
};

export default <P extends DefaultAppIProps & AppProps>() =>
  function withI18n(App: AppComponentType<P>) {
    return class extends React.Component<P & II18nProps> {
      public static async getInitialProps(appCtx: AppCtx) {
        const appProps = App.getInitialProps
          ? await App.getInitialProps(appCtx)
          : {};
        // Perform data fetching, depending on environment
        const { req } = appCtx.ctx;
        const ns = i18n.options.defaultNS!;
        // Initialise the store with the languagesToLoad and necessary namespaces needed to render this specific tree
        const initialI18nStore = req.i18n.languages.reduce(
          (prev, lng) => ({
            ...prev,
            [lng]: {
              [ns]: (req.i18n.services.resourceStore.data[lng] || {})[ns] || {},
            },
          }),
          {},
        );
        // Overwrite i18n.toJSON method to be able to serialize the instance
        req.i18n.toJSON = () => null;

        return {
          i18nInstance: req.i18n,
          initialLanguage: req.i18n.language,
          initialI18nStore,
          ...appProps,
        };
      }

      public render() {
        const { i18nInstance } = this.props;
        return (
          <I18nextProvider i18n={i18nInstance || i18n}>
            <App {...this.props} />
          </I18nextProvider>
        );
      }
    };
  };
