// Node module
import url from 'url';
import Koa from 'koa';
import serve from 'koa-static';
import koaLogger from 'koa-logger';
// Lib
import logger from '#lib/logger';
// Middleware
import hmrMiddleware from './middleware/hmr';
import rewriteMiddleware from './middleware/rewrite';
// Config
import config from './config';
// Env
const { isDev, build, name, version, connection } = config;
const { protocol, host, port, path } = connection;

// Init App
const app = new Koa();

app
  .use(koaLogger())
  .use(rewriteMiddleware());

if (isDev) {
  app.use(hmrMiddleware());
} else {
  app.use(serve(build));
}

app.listen(port, () => {
  const address = url.format({ protocol, hostname: host, port, pathname: path });
  const msg = `${name} v${version} [Address] ${address} [Mode] ${isDev ? '⚙️' : '🌎'}`;
  logger.info(msg);
});
