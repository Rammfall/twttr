import Fastify, { FastifyInstance } from 'fastify';

import { PreparedRoute } from 'lib/Router/prepareRoutes';
import {
  COOKIE_SECRET,
  SERVER_ADDRESS,
  APPLICATION_PORT,
} from 'config/application';
import { auth } from 'plugins/auth';
import validator from 'validator';
import { Context, RouteParams } from './types';

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
      ajv: {
        customOptions: {
          allErrors: true,
          formats: {
            password: (password: string): boolean => validator.isStrongPassword(password),
            accessToken: (token: string): boolean => validator.isJWT(token),
          },
        },
      },
    });

    this.initPlugins().then(() => {
      this.prepareRoutes();
    });
  }

  initPlugins = async () => {
    await this.server.register(import('@fastify/formbody'));
    await this.server.register(import('@fastify/cookie'), {
      secret: COOKIE_SECRET,
    });
    await this.server.register(import('@fastify/csrf-protection'), {
      cookieOpts: { signed: true },
    });
    await this.server.register(import('@fastify/multipart'), {
      addToBody: true,
    });
    // TODO: Add setup cors to config
    await this.server.register(import('@fastify/cors'));
    await this.server.register(import('@fastify/swagger'), {
      routePrefix: '/documentation',
      openapi: {
        info: {
          title: 'Twttr api reference',
          description: '',
          version: '0.1.0',
        },
        servers: [
          {
            url: `http://localhost:${APPLICATION_PORT}`,
          },
        ],
        components: {
          securitySchemes: {
            apiKey: {
              type: 'apiKey',
              name: 'apiKey',
              in: 'cookie',
            },
          },
        },
      },
      hideUntagged: true,
      exposeRoute: true,
    });
    await this.server.register(auth);
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
    currentRoute.forEach(({
      handler, schema, method, config,
    }) => {
      this.server.route({
        method,
        url: path,
        config,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /* @ts-ignore */
        schema,
        async handler(request, reply) {
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

          replyCookies?.forEach(({
            name, path, value = '', action,
          }) => {
            reply[action](name, value, {
              httpOnly: true,
              path: '/session',
              expires: new Date(),
              signed: true,
            });
          });

          if (replyHeaders) await reply.headers(replyHeaders);

          return reply.status(status).send(replyBody);
        },
      });
    });
  };

  logError = (importPath: string) => {
    // eslint-disable-next-line no-console
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
