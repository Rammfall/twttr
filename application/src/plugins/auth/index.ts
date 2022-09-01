import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import {
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify/types/utils';
import { RouteGenericInterface } from 'fastify/types/route';
import { FastifySchema } from 'fastify/types/schema';
import { FastifyTypeProviderDefault } from 'fastify/types/type-provider';
import UserSession from '../../db/entity/UserSession';
import { verify } from 'jsonwebtoken';
import { LOGIN_ACCESS_SECRET } from '../../config/application';
import { HttpStatusCodes } from '../../lib/Adapter/types';
import { userMessages } from '../../constants/messages';

export const auth: FastifyPluginAsync = fp(
  async (instance) => {
    instance.decorate('userId', '');
    instance.addHook(
      'onRequest',
      async function (
        {
          context: {
            config: { withAuth },
          },
          cookies: { refreshToken, accessToken },
        }: FastifyRequest<
          RouteGenericInterface,
          RawServerDefault,
          RawRequestDefaultExpression,
          FastifySchema,
          FastifyTypeProviderDefault,
          { withAuth: boolean }
        >,
        reply
      ) {
        if (withAuth) {
          const session = await UserSession.findOne({
            where: { refreshToken, accessToken },
          });

          if (!session)
            return reply
              .status(HttpStatusCodes.Forbidden)
              .clearCookie('accessToken', {
                httpOnly: true,
                path: 'session',
              })
              .clearCookie('refreshToken', {
                httpOnly: true,
                path: 'session',
              })
              .send({ title: userMessages.sessionNotFound });

          try {
            // @ts-ignore
            await verify(accessToken as string, LOGIN_ACCESS_SECRET);

            // @ts-ignore
            this.userId = session.userId;

            return;
          } catch (error) {
            return reply.status(HttpStatusCodes.Unauthorized).send({
              title: userMessages.unauthorized,
            });
          }
        }
      }
    );
  },
  {
    fastify: '4.x',
  }
);
