import { HttpMethods, RouteParams } from 'lib/Adapter/types';
import createSessionHandler from 'controllers/user/session/create';
import validationLength from '../../../../../constants/validations';

const user: RouteParams[] = [
  {
    handler: createSessionHandler,
    schema: {
      description: 'Login',
      summary: 'Login',
      tags: ['User'],
      body: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            minLength: validationLength.user.username.minLength,
            maxLength: validationLength.user.username.maxLength,
          },
          password: {
            type: 'string',
            minLength: validationLength.user.password.minLength,
            maxLength: validationLength.user.password.maxLength,
            format: 'password',
          },
        },
        required: ['username', 'password'],
      },
    },
    method: HttpMethods.POST,
    config: {
      withAuth: false,
    },
  },
];

export default user;
