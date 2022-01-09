import { Error, Serializer } from 'jsonapi-serializer';
import {
  CookieAction,
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import refreshSession from '../../../concepts/user/session/refresh';

interface Params {
  refreshToken: string;
}

const refreshSessionHandler = async ({
  cookies: { refreshToken },
}: HandlerArguments<Params>): Promise<HttpResult> => {
  try {
    const session = await refreshSession({ refreshToken });

    const SessionSerializer = new Serializer('session', {
      attributes: ['refreshToken', 'accessToken', 'sessionId'],
    });

    return {
      status: httpStatusCodes.Success,
      body: SessionSerializer.serialize(session),
      cookies: {
        accessToken: {
          value: session.accessToken,
          action: CookieAction.add,
          path: 'session',
        },
        refreshToken: {
          value: session.refreshToken,
          action: CookieAction.add,
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

export default refreshSessionHandler;
