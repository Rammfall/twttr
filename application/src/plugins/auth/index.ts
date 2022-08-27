import { FastifyPluginAsync } from 'fastify';

export const auth: FastifyPluginAsync = async (instance, opts) => {
  instance.addHook('onRequest', async (request, reply) => {
    request.url;
  });
};
