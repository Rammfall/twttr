import { HttpMethods, RouteParams } from 'lib/Adapter/types';
import refreshSessionHandler from 'controllers/user/session/refresh';

const refresh: RouteParams[] = [
  {
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
    method: HttpMethods.POST,
    handler: refreshSessionHandler,
    config: {
      withAuth: true,
    },
  },
];

export default refresh;
