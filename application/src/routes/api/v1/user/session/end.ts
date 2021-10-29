import { httpMethods, RouteParams } from 'types/RouteParams';
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
    method: httpMethods.POST,
    handler: endSessionHandler,
  },
];

export default end;
