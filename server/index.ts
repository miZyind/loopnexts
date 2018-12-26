// Node module
import { RestBindings } from '@loopback/rest';
// Common
import logger from '#common/logger';
import { loopbackConfig } from '#common/config';
// Server
import { Loopnexts } from './application';

async function main() {
  const app = new Loopnexts(loopbackConfig);
  await app.boot();
  await app.start();

  const url = await app.restServer.get(RestBindings.URL);
  const basePath = await app.restServer.get(RestBindings.BASE_PATH);
  const address = `${url}${basePath}`;
  logger.info(`Server is running at ${address}`);
  logger.info(`Try ${address}/ping`);

  return app;
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
