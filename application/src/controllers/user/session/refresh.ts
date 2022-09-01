import { Error, Serializer } from 'jsonapi-serializer';
import { CookieAction, Handler, HttpStatusCodes } from 'lib/Adapter/types';
import refreshSession from '../../../concepts/user/session/refresh';

const refreshSessionHandler: Handler = async ({ cookies }) => {
  const { refreshToken } = cookies as { refreshToken: string };
  try {
    const session = await refreshSession({ refreshToken });

    const SessionSerializer = new Serializer('session', {
      attributes: ['refreshToken', 'accessToken', 'sessionId'],
    });

    return {
      status: HttpStatusCodes.Success,
      body: SessionSerializer.serialize(session),
      cookies: [
        {
          name: 'accessToken',
          value: session.accessToken,
          action: CookieAction.add,
          path: 'session',
        },
        {
          name: 'refreshToken',
          value: session.refreshToken,
          action: CookieAction.add,
          path: 'session',
        },
      ],
    };
  } catch ({ message }) {
    return {
      status: HttpStatusCodes.Forbidden,
      body: new Error({
        title: typeof message === 'string' ? message : undefined,
      }),
      cookies: [
        {
          name: 'accessToken',
          action: CookieAction.remove,
          path: 'session',
        },
        {
          name: 'refreshToken',
          action: CookieAction.remove,
          path: 'session',
        },
      ],
    };
  }
};

export default refreshSessionHandler;
