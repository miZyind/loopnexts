// Node module
import { Server } from 'next';
import { inject } from '@loopback/context';
import { RequestContext, DefaultSequence } from '@loopback/rest';
// Common
import i18n from '../common/i18n';
import routes from '../common/routes';
// Server
import { AppBindings } from './keys';

export default class Sequence extends DefaultSequence {
  @inject(AppBindings.NEXT_SERVER)
  private nextServer!: Server;
  @inject(AppBindings.BASE_API_PATH)
  private baseApiPath!: string;

  public async handle(context: RequestContext) {
    const { request, response } = context;
    if (!request.url.startsWith(this.baseApiPath)) {
      // Handle i18n
      request.i18n = i18n;
      // Handle next server
      const handle = routes.getRequestHandler(this.nextServer);
      return handle(request, response);
    }
    // Handle rest server
    request.url = request.url.replace(this.baseApiPath, '');
    await super.handle(context);
  }
}
