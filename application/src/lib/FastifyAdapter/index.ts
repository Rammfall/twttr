import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import Ajv from 'ajv';

const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    foo: { type: 'integer' },
    bar: { type: 'string' },
  },
};

import { RouteParams } from 'types/RouteParams';
import { PreparedRoute } from '../Router/prepareRoutes';
import { SERVER_ADDRESS } from '../../config/application';

class FastifyAdapter {
  private server: FastifyInstance;
  private routes: PreparedRoute[];

  constructor({ routes }: { routes: PreparedRoute[] }) {
    this.routes = routes;
    this.server = Fastify({
      logger: true,
    });
    this.server.register(import('fastify-formbody'));
    this.server.register(import('fastify-cookie'), {
      secret: 'secret',
    });

    this.prepareRoutes();
  }

  prepareRoutes = (): void => {
    this.routes.forEach(async ({ path, importPath }) => {
      const currentRoute: { default: RouteParams[] } = await import(importPath);

      currentRoute.default.forEach(({ handler, schema, hooks, method }) => {
        this.server.route({
          method,
          url: path,
          handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const { body, params, headers, cookies, query } = request;

            const hooksResult = hooks.every((func) =>
              // @ts-ignore
              func({ params, cookies, body, headers, query })
            );

            if (!hooksResult) {
              reply.status(400).send();
              return;
            }

            const res = await handler({
              // @ts-ignore
              body,
              // @ts-ignore
              params,
              // @ts-ignore
              headers,
              // @ts-ignore
              cookies,
              // @ts-ignore
              query,
            });

            reply.status(res.status).send(res.body);
          },
        });
      });
    });
  };

  start = async (port: number): Promise<void> => {
    try {
      await this.server.listen(port, SERVER_ADDRESS);
    } catch (err) {
      this.server.log.error(err);
      process.exit(1);
    }
  };
}

export default FastifyAdapter;
