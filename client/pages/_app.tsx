// Node module
import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import App, { Container } from 'next/app';
// Hoc
import withI18n from '../hocs/with-i18n';
// Style
import 'semantic-ui-css/semantic.min.css';
// Context
import { UIContextProvider } from '../contexts/ui';

const { appName } = getConfig().publicRuntimeConfig;

@withI18n
export default class LoopNexTS extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      // <React.StrictMode>
      <Container>
        <Head>
          <title>{appName}</title>
        </Head>
        <UIContextProvider>
          <Component {...pageProps} />
        </UIContextProvider>
      </Container>
      // </React.StrictMode>
    );
  }
}
