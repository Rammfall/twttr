import { HttpMethods, RouteParams } from 'lib/Adapter/types';
import createSessionHandler from 'controllers/user/session/create';

const user: RouteParams[] = [
  {
    handler: createSessionHandler,
    schema: {
      $id: 'validation/schemas/createUser.json',
      type: 'object',
      properties: {
        body: {
          type: 'object',
          $ref: 'main.json#/definitions/user',
          required: ['username', 'password'],
        },
      },
      required: ['body'],
    },
    method: HttpMethods.POST,
    config: {
      withAuth: false,
    },
  },
];

export default user;
