import { FastifyCookieOptions } from 'fastify-cookie';
import { injectable, inject } from 'inversify';
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RequestBodyDefault,
} from 'fastify';

import {
  Cookie,
  CookieAction,
  httpStatusCodes,
  RouteParams,
  Query,
} from 'types/RouteParams';
import { PreparedRoute } from 'lib/Router/prepareRoutes';
import { SERVER_ADDRESS } from 'config/application';
import { validate as validateCommon } from 'schemas/main';

import authCheck from 'hooks/authCheck';

@injectable()
class FastifyAdapter {
  private server: FastifyInstance;
  private routes: PreparedRoute[];
  private fastify: typeof Fastify;

  constructor(
    { routes }: { routes: PreparedRoute[] },
    @inject('fastify') fastify: typeof Fastify = Fastify
  ) {
    this.routes = routes;
    this.fastify = fastify;
    this.server = Fastify({
      logger: true,
    });
    this.server.register(import('fastify-formbody'));
    this.server.register(import('fastify-cookie'), {
      secret: 'secret',
    });
    this.server.register(import('fastify-csrf'));
    this.server.register(import('fastify-multipart'), {
      limits: {
        fieldNameSize: 1000000,
        fieldSize: 1000000,
        fields: 1000000,
        fileSize: 1000000,
        files: 10,
        headerPairs: 1000000,
      },
      attachFieldsToBody: true,
    });
    this.server.register(import('fastify-cors'), {});

    this.prepareRoutes();
  }

  actions = {
    authCheck,
  };

  prepareRoutes = (): void => {
    this.routes.forEach(async ({ path, importPath }) => {
      const currentRoute: { default: RouteParams[] } = await import(importPath);
      if (currentRoute.default?.length) {
        currentRoute.default.forEach(
          ({ handler, schema, actions, hooks = [], method }) => {
            this.server.route({
              method,
              url: path,
              handler: async (request: FastifyRequest, reply: FastifyReply) => {
                const {
                  body: reqBody,
                  params: requestParams,
                  headers,
                  cookies: requestCookies,
                  query,
                } = request;
                const cookies = this.cookiesReader(requestCookies, request);
                const body = this.calculateBody(reqBody);
                const params =
                  requestParams instanceof Object ? requestParams : {};

                const validate = validateCommon(schema);

                if (
                  !validate({
                    body,
                    params,
                    headers,
                    cookies,
                    query,
                  })
                ) {
                  const { errors } = validate;
                  return reply
                    .status(httpStatusCodes.NotFound)
                    .send({ errors });
                }

                let actionsPayload: { [key: string]: unknown } = {};

                if (actions) {
                  for (
                    let forIndex = 0;
                    forIndex < actions.length;
                    forIndex++
                  ) {
                    const result = await this.actions[actions[forIndex]]({
                      body,
                      params,
                      headers,
                      cookies,
                      query,
                      payload: {
                        ip: request.ip,
                      },
                    });

                    if (!result.result) {
                      return reply
                        .status(result.reply.status)
                        .send(result.reply.body);
                    }

                    actionsPayload = { ...actionsPayload, ...result.payload };
                  }
                }

                const res = await handler({
                  body,
                  params,
                  headers,
                  cookies,
                  query,
                  payload: {
                    ip: request.ip,
                  },
                  actionsPayload,
                });

                if (res.cookies) {
                  this.cookieHandler(reply, res.cookies);
                }

                reply.status(res.status).send(res.body);
              },
            });
          }
        );
      } else {
        console.error({
          path: importPath,
          msg: `Please, check ${importPath}. It should be array of objects.`,
        });
      }
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

  calculateBody = (
    requestBody: RequestBodyDefault
  ): { [param: string]: unknown } => {
    const calcBody: { [param: string]: string | { value: string } } =
      typeof requestBody === 'object' && requestBody !== null
        ? { ...requestBody }
        : {};
    let isMultipart = true;
    const body = Object.fromEntries(
      Object.keys(calcBody).map((key) => {
        const item = calcBody[key];
        if (typeof item === 'object') {
          isMultipart = false;
        }

        if (typeof item === 'object') {
          return [key, item.value];
        }
        return [key];
      })
    );

    return isMultipart ? requestBody : body;
  };

  cookiesReader = (
    requestCookies: FastifyCookieOptions,
    request: FastifyRequest
  ): {
    [param: string]: string;
  } => {
    const cookies: { [param: string]: string } = {};
    for (const [key, value] of Object.entries(requestCookies)) {
      const cookie = request.unsignCookie(value);

      if (cookie) {
        cookies[key] = cookie.value || '';
      }
    }

    return cookies;
  };

  cookieHandler = (reply: FastifyReply, cookies: Cookie): void => {
    for (const [key, cookie] of Object.entries(cookies)) {
      if (cookie.action === CookieAction.add) {
        const { value, action, path } = cookie;
        reply[action](key, value, {
          httpOnly: true,
          signed: true,
          path,
        });
      } else {
        reply[cookie.action](key, {
          path: cookie.path,
        });
      }
    }
  };
}

export default FastifyAdapter;
