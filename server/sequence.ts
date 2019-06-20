// Node module
import { Server } from 'next';
import { inject } from '@loopback/context';
import i18nextMiddleware from 'i18next-express-middleware';
import { RequestContext, DefaultSequence } from '@loopback/rest';
// Common
import i18n from '../common/i18n';
import routes from '../common/routes';
// Server
import { AppBindings } from './keys';

const handleI18n = ({ request, response }: RequestContext) =>
  new Promise((resolve) =>
    i18nextMiddleware.handle(i18n)(request, response, resolve),
  );

export default class Sequence extends DefaultSequence {
  @inject(AppBindings.NEXT_SERVER)
  private nextServer!: Server;
  @inject(AppBindings.BASE_API_PATH)
  private baseApiPath!: string;

  public async handle(context: RequestContext) {
    const { request, response } = context;
    if (!request.url.startsWith(this.baseApiPath)) {
      // Handle i18n
      await handleI18n(context);
      // Handle next server
      const handle = routes.getRequestHandler(this.nextServer);
      return handle(request, response);
    }
    // Handle rest server
    request.url = request.url.replace(this.baseApiPath, '');
    await super.handle(context);
  }
}
