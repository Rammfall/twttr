import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

import { APPLICATION_PORT } from './config/application';
import db from './initializers/db';

const server: FastifyInstance = Fastify({
  logger: true,
});
dotenv.config();

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
    await db();
    await server.listen(APPLICATION_PORT, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
