// Node Module
import Koa from 'koa';
import path from 'path';
import serve from 'koa-static';
import logger from 'koa-logger';
// Lib
import pino from '../lib/logger';
// Middleware
import hmrMiddleware from './middleware/hmr-middleware';
// Env
const isDev = process.env.NODE_ENV === 'development';
const appName = process.env.APP_NAME!;
const appVersion = process.env.APP_VERSION!;
const appDist = process.env.APP_DIST!;
const appPort = process.env.APP_PORT!;

const app = new Koa();

if (isDev) {
  app
    .use(logger())
    .use(hmrMiddleware());
} else {
  app
    .use(serve(appDist));
}

app.listen(appPort, () => pino.info(`${appName} v${appVersion} [Port] ${appPort} [Mode] ${isDev ? '⚙️' : '🌎'}`));
