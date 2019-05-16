// Node module
import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';
import { Container, DefaultAppIProps, AppProps } from 'next/app';
// Hoc
import withI18n, { II18nProps } from '../hocs/withI18n';
// Redux
import withRedux, { IReduxProps } from '../redux';
// Style
import 'semantic-ui-css/semantic.min.css';

const { appName } = getConfig().publicRuntimeConfig;

type NextAppProps = DefaultAppIProps & AppProps;
type InjectedProps = NextAppProps & II18nProps & IReduxProps;

@withRedux<InjectedProps>()
@withI18n<InjectedProps>()
export default class MainApp extends React.Component<InjectedProps> {
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
