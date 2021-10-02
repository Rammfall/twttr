import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import { httpStatusCodes, RouteParams } from 'types/RouteParams';
import { PreparedRoute } from 'lib/Router/prepareRoutes';
import { SERVER_ADDRESS } from 'config/application';
import { validate as validateCommon } from 'schemas/main';

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

  prepareRoutes = (): void => {
    this.routes.forEach(async ({ path, importPath }) => {
      const currentRoute: { default: RouteParams[] } = await import(importPath);
      if (currentRoute.default?.length) {
        currentRoute.default.forEach(
          ({ handler, schema, hooks = [], method }) => {
            this.server.route({
              method,
              url: path,
              handler: async (request: FastifyRequest, reply: FastifyReply) => {
                let isMultipart = true;
                const newBody = Object.fromEntries(
                  // @ts-ignore
                  Object.keys(request.body).map((key) => {
                    // @ts-ignore
                    if (request.body[key].value === undefined) {
                      isMultipart = false;
                    }
                    return [
                      key,
                      // @ts-ignore
                      request.body[key].value,
                    ];
                  })
                );

                const {
                  body: reqBody,
                  params,
                  headers,
                  cookies: requestCookies,
                  query,
                } = request;
                const cookies: { [param: string]: string } = {};

                if (requestCookies) {
                  for (const [key, value] of Object.entries(requestCookies)) {
                    const cookie = request.unsignCookie(value);

                    if (cookie) {
                      cookies[key] = request.unsignCookie(value).value || '';
                    }
                  }
                }
                const validate = validateCommon(schema);
                const body = isMultipart ? newBody : reqBody;

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
                  payload: {
                    ip: request.ip,
                  },
                });

                if (res.cookies) {
                  for (const [key, { value, action }] of Object.entries(
                    res.cookies
                  )) {
                    reply[action](key, value, {
                      httpOnly: true,
                      signed: true,
                    });
                  }
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
}

export default FastifyAdapter;
