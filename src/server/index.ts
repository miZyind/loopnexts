// Node Module
import Koa from 'koa';
import path from 'path';
import serve from 'koa-static';
import logger from 'koa-logger';
// Lib
import config from './config';
import pino from '../lib/logger';
// Middleware
import devServerMiddleware from './lib/dev-server-middleware';

const { port, dist, version, isDev } = config;
const app = new Koa();

if (isDev) {
  app
    .use(logger())
    .use(devServerMiddleware());
} else {
  app
    .use(serve(path.resolve(dist)));
}

app
  .listen(port, () => pino.info(`RKSTWB v${version} [Port] ${port} [Mode] ${isDev ? '⚙️' : '🌎'}`));
