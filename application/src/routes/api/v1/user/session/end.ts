import { HttpMethods, RouteParams } from 'lib/Adapter/types';
import endSessionHandler from 'controllers/user/session/end';

const end: RouteParams[] = [
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
    method: HttpMethods.DELETE,
    handler: endSessionHandler,
    config: {
      withAuth: true,
    },
  },
];

export default end;
