// Node module
import { Server } from 'next';
import { inject } from '@loopback/context';
import { RequestContext, DefaultSequence } from '@loopback/rest';
// Common
import routes from '#common/routes';
// Server
import { AppBindings } from './keys';

export default class Sequence extends DefaultSequence {
  @inject(AppBindings.NEXT_SERVER)
  private nextInstance!: Server;

  public async handle(context: RequestContext) {
    const { request, response } = context;
    // Handle front-end
    if (!request.url.startsWith('/api') && !request.url.startsWith('/assets')) {
      // Handle next server
      const handle = routes.getRequestHandler(this.nextInstance);
      return handle(request, response);
    }
    // Habdle rest server
    await super.handle(context);
  }
}
