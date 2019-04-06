// Node module
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
// Common
import { loopbackConfig, isDev } from '#common/config';
// Server
import MixinedApplication from './utils/mixined-application';
import { MySequence } from './sequence';

export class Loopnexts extends MixinedApplication {
  constructor() {
    super(loopbackConfig);

    this.projectRoot = __dirname;
    this.sequence(MySequence);
    this.bind(RestExplorerBindings.CONFIG).to({ path: '/explorer' });
    this.component(RestExplorerComponent);
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: [isDev ? '.controller.ts' : '.controller.js'],
      },
    };
  }
}
