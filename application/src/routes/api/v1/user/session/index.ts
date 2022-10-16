import { HttpMethods, RouteParams } from 'lib/Adapter/types';
import sessionListHandler from 'controllers/user/session';
import deleteSessionHandler from 'controllers/user/session/delete';

const list: RouteParams[] = [
  {
    method: HttpMethods.GET,
    handler: sessionListHandler,
    schema: {
      description: 'All sessions',
      summary: 'All sessions',
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
    config: {
      withAuth: true,
    },
  },
  {
    schema: {
      description: 'Drop session',
      summary: 'Drop session',
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
      body: {
        type: 'object',
        properties: {
          sessionId: {
            type: 'string',
            format: 'uuid',
          },
        },
        required: ['sessionId'],
      },
    },
    method: HttpMethods.DELETE,
    handler: deleteSessionHandler,
    config: {
      withAuth: true,
    },
  },
];

export default list;
