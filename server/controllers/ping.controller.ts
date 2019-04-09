// Node module
import { inject } from '@loopback/context';
import { Request, RestBindings, get, ResponseObject } from '@loopback/rest';

const PING_RESPONSE: ResponseObject = {
  description: 'Ping Response',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          greeting: { type: 'string' },
          date: { type: 'string' },
          url: { type: 'string' },
          headers: {
            type: 'object',
            properties: {
              'Content-Type': { type: 'string' },
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export default class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/ping', { responses: { '200': PING_RESPONSE } })
  public ping() {
    return {
      greeting: 'Hello from Loopnexts',
      date: new Date(),
      url: this.req.url,
      headers: { ...this.req.headers },
    };
  }
}
