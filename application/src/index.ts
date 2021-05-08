import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

import { APPLICATION_PORT, SERVER_ADDRESS } from './config/application';
import db from './initializers/db';
import apiRoute from './routes/api';

const server: FastifyInstance = Fastify({
  logger: true,
  http2: true,
});
dotenv.config();

server.register(apiRoute);

const start = async () => {
  try {
    await db();
    await server.listen(APPLICATION_PORT, SERVER_ADDRESS);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
