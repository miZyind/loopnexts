// Node module
import url from 'url';
import { Middleware } from 'koa';
// Lib
import logger from '#lib/logger';

const rewriteMiddleware = (): Middleware => {
  return async (ctx, next) => {
    const { req } = ctx;

    const methodCondition = req.method !== 'GET';
    logger.debug('methodCondition', methodCondition);

    const headersCondition = typeof req.headers.accept !== 'string';
    logger.debug('headersCondition', headersCondition);

    const jsonCondition = req.headers.accept!.includes('application/json');
    logger.debug('jsonCondition', jsonCondition);

    const fileCondition = url.parse(req.url!).pathname!.includes('.');
    logger.debug('fileCondition', fileCondition);

    const shouldNotRewrite = methodCondition || headersCondition || jsonCondition || fileCondition;

    if (!shouldNotRewrite) {
      logger.debug('Rewriting', req.method, req.url);
      req.url = '/index.html';
    }

    await next();
  };
};

export default rewriteMiddleware;
