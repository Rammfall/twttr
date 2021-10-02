import { httpMethods, RouteParams } from 'types/RouteParams';
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
    method: httpMethods.POST,
  },
];

export default user;
