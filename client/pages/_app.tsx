// Node module
import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import App, { Container, NextAppContext } from 'next/app';

const { appName } = getConfig().publicRuntimeConfig;

export default class extends App {
  public static async getInitialProps({ Component, ctx }: NextAppContext) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    return { pageProps };
  }

  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>{appName}</title>
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}
