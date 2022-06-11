import Fastify, { FastifyInstance } from 'fastify';

import { PreparedRoute } from 'lib/Router/prepareRoutes';
import { validate as validateCommon } from 'schemas/main';
import { Actions, httpStatusCodes, RouteParams } from 'types/RouteParams';
import authCheck from '../../hooks/authCheck';

interface AdapterProps {
  routes: PreparedRoute[];
}

class Adapter {
  private server: FastifyInstance;
  private routes: PreparedRoute[];

  constructor({ routes }: AdapterProps) {
    this.routes = routes;
    this.server = Fastify({
      logger: true,
    });
    this.server.register(import('@fastify/formbody'));
    this.server.register(import('@fastify/cookie'), {
      // TODO: To config
      secret: 'secret',
    });
    this.server.register(import('@fastify/csrf-protection'));
    this.server.register(import('@fastify/multipart'), {
      limits: {
        fieldNameSize: 1000000,
        fieldSize: 1000000,
        fields: 1000000,
        fileSize: 1000000,
        files: 10,
        headerPairs: 1000000,
      },
      addToBody: true,
    });
    // TODO: Add setup cors to config
    this.server.register(import('@fastify/cors'));
  }

  actions = {
    authCheck,
  };

  prepareRoutes = (): void => {
    this.routes.forEach(async ({ path, importPath }) => {
      const currentRoute: { default: RouteParams[] } = await import(importPath);

      if (currentRoute.default?.length) {
        this.prepareRoute(currentRoute.default, path);
      } else {
        this.logError(importPath);
      }
    });
  };

  prepareRoute = (currentRoute: RouteParams[], path: string) => {
    currentRoute.forEach(({ handler, schema, actions, method, hooks }) => {
      this.server.route({
        method,
        url: path,
        handler: async (request, reply) => {
          const { body, headers, params, cookies, query } = request;

          const validateRequest = validateCommon(schema);

          if (
            !validateRequest({
              body,
              params,
              headers,
              cookies,
              query,
            })
          ) {
            const { errors } = validateRequest;
            return reply.status(httpStatusCodes.BadRequest).send({
              errors,
            });
          }

          if (actions) {
            const actionsToRun = actions.map(
              (actionName) => this.actions[actionName]
            );

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            try {
              await Promise.all(...actionsToRun);
            }
          }
        },
      });
    });
  };

  logError = (importPath: string) => {
    console.error({
      path: importPath,
      message: `Please, check ${importPath}. It should be array of objects`,
    });
  };
}

export default Adapter;
