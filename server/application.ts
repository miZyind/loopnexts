// Node module
import next from 'next';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { BootMixin } from '@loopback/boot';
import Backend from 'i18next-node-fs-backend';
import { LanguageDetector } from 'i18next-express-middleware';
import { RestApplication } from '@loopback/rest';
import { RepositoryMixin } from '@loopback/repository';
import { ServiceMixin } from '@loopback/service-proxy';
// Common
import i18n from '../common/i18n';
import logger from '../common/logger';
import {
  appName,
  appVersion,
  isDev,
  folderPaths,
  loopbackConfig,
  nextConfig,
} from '../common/config';
// Server
import Sequence from './sequence';
import { AppBindings } from './keys';

const Application = BootMixin(ServiceMixin(RepositoryMixin(RestApplication)));

export default class App extends Application {
  private readonly nextServer = next(nextConfig);

  constructor() {
    super(loopbackConfig);
    // Setup bootstrapper
    this.projectRoot = folderPaths.server;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: [isDev ? '.controller.ts' : '.controller.js'],
      },
    };
    // Setup app information
    this.bind(AppBindings.NAME).to(appName);
    this.bind(AppBindings.VERSION).to(appVersion);
    // Setup rest explorer
    this.component(RestExplorerComponent);
    this.bind(AppBindings.BASE_API_PATH).to('/api');
    this.bind(RestExplorerBindings.CONFIG).to({ path: '/explorer' });
    // Setup next server
    this.bind(AppBindings.NEXT_SERVER).to(this.nextServer);
    // Setup sequence
    this.sequence(Sequence);
  }

  public async start() {
    // Setup i18n instance
    await new Promise((resolve) =>
      i18n
        .use(Backend)
        .use(LanguageDetector)
        .init(resolve),
    );
    await super.start();
    await this.nextServer.prepare();
    logger.info(
      `${appName} v${appVersion} is running at ${this.restServer.url}`,
    );
  }

  public async stop() {
    logger.info(`${appName} v${appVersion} is shutting down...`);
    await this.nextServer.close();
    await super.stop();
  }
}
