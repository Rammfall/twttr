import { httpMethods, RouteParams } from 'types/RouteParams';
import refreshSessionHandler from '../../../../../controllers/user/session/refresh';

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
    handler: refreshSessionHandler,
  },
];

export default end;
