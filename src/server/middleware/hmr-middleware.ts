// Node module
import koaWebpackMiddleware from 'koa-webpack';
// Webpack config
import webpackConfig from '../../../config/webpack/client/webpack.dev';
// Config
import config from '../config';

const hmrMiddleware = () => koaWebpackMiddleware({
  config: webpackConfig,
  dev: { publicPath: config.connection.path, logLevel: 'silent' },
  hot: { logLevel: 'silent' }
});

export default hmrMiddleware;
