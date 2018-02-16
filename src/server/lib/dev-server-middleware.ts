// Node Module
import wepback from 'webpack';
import compose from 'koa-compose';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
// Lib
import logger from '../../lib/logger';
// Config
import devConfig from '../../../config/webpack/client/webpack.dev';

const devServerMiddleware = () => {
  const compile = wepback(devConfig as wepback.Configuration);
  const dev = devMiddleware(compile, {
    noInfo: true, // display no info to console (only warnings and errors)
    quiet: true, // display nothing to the console
    lazy: false, // switch into lazy mode, that means no watching, but recompilation on every request
    watchOptions: { aggregateTimeout: 300, poll: true },
    publicPath: '/', // public path to bind the middleware to, use the same as in webpack
  });
  const hot = hotMiddleware(compile, {
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  });

  return compose([dev, hot]);
};

export default devServerMiddleware;
