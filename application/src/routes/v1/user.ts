import { FastifyPluginAsync, FastifyInstance } from 'fastify';

import validator from 'validator';

import createUser from 'controllers/user/create';

const userRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.addSchema({
    $id: 'createUser',
    type: 'object',
    properties: {
      username: {
        type: 'string',
        minLength: 2,
        maxLength: 30,
      },
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        validator: (str: string) => validator.isStrongPassword(str),
      },
    },
  });
  fastify.setErrorHandler(function (error, request, reply) {
    reply.status(400).send({ error });
  });
  fastify.post(
    '/create',
    {
      schema: {
        body: {
          $ref: 'createUser',
        },
      },
    },
    createUser
  );
};

export default userRoute;
