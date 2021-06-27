import Fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

import { APPLICATION_PORT, SERVER_ADDRESS } from './config/application';
import db from './initializers/db';
import apiRoute from './routes/api';

const logger = {};

const server: FastifyInstance = Fastify({
  logger: logger,
});

server.register(import('fastify-formbody'));
server.register(apiRoute, { prefix: '/api' });

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
