import { Error } from 'jsonapi-serializer';

import {
  CookieAction,
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import endSession from 'concepts/user/session/end';

interface Params {
  refreshToken: string;
}

const endSessionHandler = async ({
  cookies: { refreshToken },
}: HandlerArguments<Params>): Promise<HttpResult> => {
  try {
    await endSession({ refreshToken });

    return {
      status: httpStatusCodes.Success,
      cookies: {
        accessToken: {
          action: CookieAction.remove,
          path: 'session',
        },
        refreshToken: {
          action: CookieAction.remove,
          path: 'session',
        },
      },
    };
  } catch ({ message }) {
    return {
      status: httpStatusCodes.Forbidden,
      body: new Error({
        title: typeof message === 'string' ? message : undefined,
      }),
      cookies: {
        accessToken: {
          action: CookieAction.remove,
          path: 'session',
        },
        refreshToken: {
          action: CookieAction.remove,
          path: 'session',
        },
      },
    };
  }
};

export default endSessionHandler;
