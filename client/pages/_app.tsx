// Node module
import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import { Provider } from 'react-redux';
import App, { Container, NextAppContext } from 'next/app';
// Redux
import { IProps, withReduxStore } from '../redux';

const { appName } = getConfig().publicRuntimeConfig;

@withReduxStore
export default class MainApp extends App<IProps> {
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
