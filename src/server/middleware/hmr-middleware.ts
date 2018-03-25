// Node module
import koaWebpackMiddleware from 'koa-webpack';
// Config
import config from '../../../config/webpack/client/webpack.dev';

const hmrMiddleware = () => koaWebpackMiddleware({
  config,
  dev: { publicPath: '/', logLevel: 'silent' },
  hot: { logLevel: 'silent' }
});

export default hmrMiddleware;
