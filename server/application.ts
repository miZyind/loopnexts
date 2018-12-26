// Node module
import { BootMixin } from '@loopback/boot';
import { RestApplication } from '@loopback/rest';
import { RepositoryMixin } from '@loopback/repository';
import { ServiceMixin } from '@loopback/service-proxy';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
// Common
import { loopbackConfig } from '#common/config';
// Server
import { MySequence } from './sequence';
import * as path from 'path';

export class Loopnexts extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor() {
    super(loopbackConfig);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
