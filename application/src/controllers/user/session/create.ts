import { Error, Serializer } from 'jsonapi-serializer';

import {
  CookieAction,
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import createSession from 'concepts/user/session/create';
import UserAccount from '../../../db/entity/UserAccount';

interface Params {
  username: string;
  email: string;
  password: string;
}

const createSessionHandler = async ({
  body: { username, password },
  headers: { 'user-agent': device },
  payload: { ip },
}: HandlerArguments<Params>): Promise<HttpResult> => {
  try {
    const session = await createSession({
      username,
      password,
      device,
      ip,
    });
    const SessionSerializer = new Serializer('session', {
      attributes: ['accessToken', 'refreshToken', 'user', 'sessionId'],
      user: {
        ref: (_: undefined, user: UserAccount) => user.id,
        attributes: ['username', 'email', 'role'],
      },
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
    };
  }
};

export default createSessionHandler;
