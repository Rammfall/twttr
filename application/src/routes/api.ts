import { FastifyPluginAsync, FastifyInstance } from 'fastify';

import v1Route from './v1';

const apiRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(v1Route, { prefix: '/v1' });
};

export default apiRoute;
