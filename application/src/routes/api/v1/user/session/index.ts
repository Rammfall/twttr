import { HttpMethods, RouteParams } from 'lib/Adapter/types';
import sessionListHandler from 'controllers/user/session';
import deleteSessionHandler from 'controllers/user/session/delete';

const list: RouteParams[] = [
  {
    method: HttpMethods.GET,
    handler: sessionListHandler,
    schema: {
      $id: 'validation/schemas/refreshSession.json',
      type: 'object',
      properties: {
        cookies: {
          type: 'object',
          $ref: 'main.json#/definitions/session',
          required: ['refreshToken', 'accessToken'],
        },
      },
      required: ['cookies'],
    },
    config: {
      withAuth: true,
    },
  },
  {
    schema: {
      $id: 'validation/schemas/deleteSession.json',
      type: 'object',
      properties: {
        cookies: {
          type: 'object',
          $ref: 'main.json#/definitions/session',
          required: ['refreshToken', 'accessToken'],
        },
        body: {
          type: 'object',
          $ref: 'main.json#/definitions/session',
          required: ['sessionId'],
        },
      },
      required: ['cookies', 'body'],
    },
    method: HttpMethods.DELETE,
    handler: deleteSessionHandler,
    config: {
      withAuth: true,
    },
  },
];

export default list;
