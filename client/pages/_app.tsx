// Node module
import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import { Provider } from 'react-redux';
import App, { Container, NextAppContext } from 'next/app';
// I18n
import withI18next, { II18nProps } from '../hocs/withI18next';
// Redux
import withReduxStore, { IReduxProps } from '../redux';
// Style
import 'semantic-ui-css/semantic.min.css';

const { appName } = getConfig().publicRuntimeConfig;

type InjectedProps = II18nProps & IReduxProps;

/**
 * Wait for TypeScript to implement "Generic Decorators"
 * https://github.com/Microsoft/TypeScript/issues/2607
 */
@withI18next<InjectedProps>()
@withReduxStore<InjectedProps>()
export default class MainApp extends App<InjectedProps> {
  public static async getInitialProps({ Component, ctx }: NextAppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { ...pageProps };
  }

  public render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>{appName}</title>
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}
