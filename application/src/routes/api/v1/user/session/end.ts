import { HttpMethods, RouteParams } from 'lib/Adapter/types';
import endSessionHandler from 'controllers/user/session/end';

const end: RouteParams[] = [
  {
    schema: {
      description: 'Logout',
      summary: 'Logout',
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
    method: HttpMethods.DELETE,
    handler: endSessionHandler,
    config: {
      withAuth: true,
    },
  },
];

export default end;
