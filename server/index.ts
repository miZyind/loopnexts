// Common
import logger from '../common/logger';
// Server
import App from './application';

async function main() {
  const app = new App();
  try {
    await app.boot();
    await app.start();
  } catch (error) {
    logger.error(error);
    await app.stop();
    process.exit(1);
  }
}

main();
