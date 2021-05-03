import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
};

server.get('/ping', opts, async () => {
  return { pong: 'it worked!' };
});

const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
