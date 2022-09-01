import { Error } from 'jsonapi-serializer';

import { CookieAction, Handler, HttpStatusCodes } from 'lib/Adapter/types';
import endSession from 'concepts/user/session/end';

interface Params {
  refreshToken: string;
}

const endSessionHandler: Handler = async ({ cookies }) => {
  const { refreshToken } = cookies as Params;
  try {
    await endSession({ refreshToken });

    return {
      status: HttpStatusCodes.Success,
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

export default endSessionHandler;
