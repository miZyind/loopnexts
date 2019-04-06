// Node module
import React from 'react';
import getConfig from 'next/config';
import { ServerStyleSheet } from 'styled-components';
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
} from 'next/document';

interface IProps {
  styleTags: Array<React.ReactElement<{}>>;
}

const { basePath, baseAssetsPath } = getConfig().publicRuntimeConfig;

export default class extends Document<IProps> {
  public static async getInitialProps(ctx: NextDocumentContext) {
    const sheet = new ServerStyleSheet();
    const renderPageSrc = ctx.renderPage;
    const initialProps = await Document.getInitialProps(ctx);
    const style = initialProps.styles as Iterable<React.ReactNode>;
    ctx.renderPage = () =>
      renderPageSrc((App) => (props) =>
        sheet.collectStyles(<App {...props} />),
      );
    return { ...initialProps, styles: [...style, ...sheet.getStyleElement()] };
  }

  public render() {
    /**
     * basePath('/') + baseAssetsPath('/assets') = '/assets/'
     * basePath('/app') + baseAssetsPath('/assets') = '/app/assets/'
     */
    const resolvedPath =
      basePath === '/' ? `${baseAssetsPath}/` : `${basePath}${baseAssetsPath}/`;
    return (
      <html>
        <Head>
          <base href={resolvedPath} />
          <meta content='IE=edge,chrome=1' />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1,shrink-to-fit=no'
          />
          <link rel='icon' href='favicon.ico' />
          <link type='text/css' href='/_next/static/styles.css' />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
