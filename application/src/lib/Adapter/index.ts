import Fastify, { FastifyInstance } from 'fastify';

import { PreparedRoute } from 'lib/Router/prepareRoutes';
import { validate as validateCommon } from 'schemas/main';
import { COOKIE_SECRET, SERVER_ADDRESS } from '../../config/application';
import { Context, HttpStatusCodes, RouteParams } from './types';
import { auth } from '../../plugins/auth';

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
      secret: COOKIE_SECRET,
    });
    this.server.register(import('@fastify/csrf-protection'), {
      cookieOpts: { signed: true },
    });
    this.server.register(import('@fastify/multipart'), {
      addToBody: true,
    });
    // TODO: Add setup cors to config
    this.server.register(import('@fastify/cors'));
    this.server.register(import('@fastify/swagger'));
    this.server.register(auth);

    this.prepareRoutes();
  }

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
    currentRoute.forEach(({ handler, schema, method, config }) => {
      this.server.route({
        method,
        url: path,
        config,
        handler: async function (request, reply) {
          const {
            body,
            headers,
            params,
            cookies,
            query,
            ip,
            method,
            url,
            routerPath,
            routerMethod,
          } = request;

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
            return reply.status(HttpStatusCodes.BadRequest).send({
              errors,
            });
          }
          const bindedHandler = handler.bind(this as Context);

          const {
            status,
            body: replyBody,
            headers: replyHeaders,
            cookies: replyCookies,
          } = await bindedHandler({
            headers,
            query,
            body,
            params,
            cookies,
            payload: {
              ip,
              routerPath,
              routerMethod,
              url,
              method,
            },
          });

          replyCookies?.forEach(({ name, path, value = '', action }) => {
            reply[action](name, value, {
              httpOnly: true,
              path,
            });
          });

          replyHeaders && reply.headers(replyHeaders);

          reply.status(status).send(replyBody);
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

  start = async (port: number): Promise<void> => {
    try {
      await this.server.listen({
        port,
        host: SERVER_ADDRESS,
      });
    } catch (err) {
      this.server.log.error(err);
      process.exit(1);
    }
  };
}

export default Adapter;
