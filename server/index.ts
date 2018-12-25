import config from '#common/config';
import { Loopnexts } from './application';

async function main() {
  const app = new Loopnexts(config);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}

main().catch((err) => {
  console.error('Cannot start the application.', err);
  process.exit(1);
});
