// Node module
import { Server } from 'next';
import { inject } from '@loopback/context';
import { RequestContext, DefaultSequence } from '@loopback/rest';
// Common
import routes from '../common/routes';
// Server
import { AppBindings } from './keys';

export default class Sequence extends DefaultSequence {
  @inject(AppBindings.NEXT_SERVER)
  private nextServer!: Server;
  @inject(AppBindings.BASE_API_PATH)
  private baseApiPath!: string;
  @inject(AppBindings.BASE_ASSETS_PATH)
  private baseAssetsPath!: string;

  public async handle(context: RequestContext) {
    const { request, response } = context;
    // Handle next server
    if (
      !request.url.startsWith(this.baseApiPath) &&
      !request.url.startsWith(this.baseAssetsPath)
    ) {
      const handle = routes.getRequestHandler(this.nextServer);
      return handle(request, response);
    }
    // Habdle rest server
    request.url = request.url.replace(this.baseApiPath, '');
    await super.handle(context);
  }
}
