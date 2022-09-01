import { HttpMethods, RouteParams } from 'lib/Adapter/types';
import createUserHandler from 'controllers/user/create';

const user: RouteParams[] = [
  {
    handler: createUserHandler,
    schema: {
      $id: 'validation/schemas/createUser.json',
      type: 'object',
      properties: {
        body: {
          type: 'object',
          $ref: 'main.json#/definitions/user',
          required: ['username', 'email', 'password'],
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
