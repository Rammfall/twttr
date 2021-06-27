import { FastifyPluginAsync, FastifyInstance } from 'fastify';
import userRoute from './user';

const v1Route: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.register(userRoute, { prefix: '/user' });
};

export default v1Route;
