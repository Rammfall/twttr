import { Actions, httpMethods, RouteParams } from 'types/RouteParams';
import sessionListHandler from 'controllers/user/session';

const list: RouteParams[] = [
  {
    method: httpMethods.GET,
    actions: [Actions.authCheck],
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
  },
];

export default list;
