// Node module
import next from 'next';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { BootMixin } from '@loopback/boot';
import { RestApplication } from '@loopback/rest';
import { RepositoryMixin } from '@loopback/repository';
import { ServiceMixin } from '@loopback/service-proxy';
// Common
import logger from '#common/logger';
import { name, isDev, loopbackConfig, nextConfig } from '#common/config';
// Server
import Sequence from './sequence';
import { AppBindings } from './keys';

const Application = BootMixin(ServiceMixin(RepositoryMixin(RestApplication)));

export default class App extends Application {
  private readonly nextServer = next(nextConfig);

  constructor() {
    super(loopbackConfig);
    // Setup bootstrapper
    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: [isDev ? '.controller.ts' : '.controller.js'],
      },
    };
    // Setup rest explorer
    this.component(RestExplorerComponent);
    this.bind(RestExplorerBindings.CONFIG).to({ path: '/explorer' });
    // Setup next Server
    this.bind(AppBindings.NEXT_SERVER).to(this.nextServer);
    // Setup sequence
    this.sequence(Sequence);
  }

  public async start() {
    await super.start();
    await this.nextServer.prepare();
    logger.info(`${name} is running at ${this.restServer.url}`);
  }

  public async stop() {
    logger.info(`${name} is shutting down...`);
    await this.nextServer.close();
    await super.stop();
  }
}
