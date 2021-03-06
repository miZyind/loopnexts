import 'react-i18next';
import i18next from 'i18next';
import { AppComponentType, DefaultAppIProps } from 'next/app';
declare module 'react-i18next' {
  interface IWithSSRProps {
    initialLanguage: string;
    initialI18nStore: {
      [language: string]: {
        [namespace: string]:
          | string
          | {
              [key: string]: string;
            };
      };
    };
  }
  function withSSR(): (
    App: AppComponentType<DefaultAppIProps>,
  ) => React.ComponentType<IWithSSRProps>;
}
