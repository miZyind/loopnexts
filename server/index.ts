// Common
import logger from '#common/logger';
// Server
import { Loopnexts } from './application';

async function main() {
  const app = new Loopnexts();

  await app.boot();
  await app.start();

  const { url } = app.restServer;
  const mode = process.env.NODE_ENV;

  logger.info(`Server is running at ${url} with ${mode} mode`);
  logger.info(`Try ${url}/ping`);

  return app;
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
