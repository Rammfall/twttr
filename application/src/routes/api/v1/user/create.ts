import { HttpMethods, RouteParams } from 'lib/Adapter/types';
import createUserHandler from 'controllers/user/create';
import validationLength from 'constants/validations';

const user: RouteParams[] = [
  {
    handler: createUserHandler,
    schema: {
      description: 'Registration',
      summary: 'Registration',
      tags: ['User'],
      body: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            minLength: validationLength.user.username.minLength,
            maxLength: validationLength.user.username.maxLength,
          },
          email: {
            type: 'string',
            minLength: validationLength.user.email.minLength,
            maxLength: validationLength.user.email.maxLength,
            format: 'email',
          },
          password: {
            type: 'string',
            minLength: validationLength.user.password.minLength,
            maxLength: validationLength.user.password.maxLength,
            format: 'password',
          },
        },
        required: ['username', 'email', 'password'],
      },
      response: {
        200: {
          type: 'object',
          headers: {
            'set-cookie': {
              type: 'string',
              description: 'accessToken=token; Path=session; HttpOnly',
            },
          },
          cookies: {
            first: {
              type: 'string',
              description: 'Bla',
            },
          },
        },
      },
    },
    method: HttpMethods.POST,
    config: {
      withAuth: false,
    },
  },
];

export default user;
