import {
  FastifyInstance,
  FastifyPluginAsync,
  DoneFuncWithErrOrRes,
} from 'fastify';

export interface MyPluginOptions {
  myPluginOption: string;
}

const apiRoute = (
  fastify: FastifyInstance,
  opts: any,
  done: DoneFuncWithErrOrRes
): FastifyPluginAsync<MyPluginOptions> => {
  fastify.get('/', async (request, reply) => {
    reply.send({ hi: 'te' });
  });
  done();
};

export default apiRoute;
