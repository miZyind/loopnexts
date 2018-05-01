// Node Module
import Koa from 'koa';
import { format } from 'url';
import serve from 'koa-static';
import logger from 'koa-logger';
// Lib
import pino from '#lib/logger';
// Middleware
import hmrMiddleware from './middleware/hmr-middleware';
// Config
import config from './config';

const { isDev, dist, name, version, connection } = config;
const { protocol, host, port, path } = connection;
const address = format({ protocol, hostname: host, port, pathname: path });
const app = new Koa();

if (isDev) {
  app
    .use(logger())
    .use(hmrMiddleware());
} else {
  app
    .use(serve(dist));
}

app
  .use(async (ctx) => { ctx.redirect('/'); })
  .listen(port, () => pino.info(`${name} v${version} [Address] ${address} [Mode] ${isDev ? '⚙️' : '🌎'}`));
