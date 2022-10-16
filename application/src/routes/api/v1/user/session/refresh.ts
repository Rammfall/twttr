import { HttpMethods, RouteParams } from 'lib/Adapter/types';
import refreshSessionHandler from 'controllers/user/session/refresh';

const refresh: RouteParams[] = [
  {
    schema: {
      description: 'Refresh token',
      summary: 'Refresh token',
      tags: ['User'],
      cookies: {
        type: 'object',
        properties: {
          accessToken: {
            type: 'string',
            format: 'accessToken',
          },
          refreshToken: {
            type: 'string',
            format: 'uuid',
          },
        },
        required: ['refreshToken', 'accessToken'],
      },
    },
    method: HttpMethods.POST,
    handler: refreshSessionHandler,
    config: {
      withAuth: true,
    },
  },
];

export default refresh;
