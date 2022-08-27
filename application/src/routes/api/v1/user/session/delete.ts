import { Actions, httpMethods, RouteParams } from 'types/RouteParams';
import deleteSessionHandler from 'controllers/user/session/delete';

const refresh: RouteParams[] = [
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
    method: httpMethods.DELETE,
    handler: deleteSessionHandler,
    opts: {
      auth: true,
    },
  },
];

export default refresh;
