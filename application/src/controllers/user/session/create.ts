import { Error, Serializer } from 'jsonapi-serializer';

import { HttpStatusCodes, Handler, CookieAction } from 'lib/Adapter/types';
import createSession from 'concepts/user/session/create';
import UserAccount from '../../../db/entity/UserAccount';

const createSessionHandler: Handler = async ({
  body,
  headers: { 'user-agent': device },
  payload: { ip },
}) => {
  const { username, password } = body as { username: string; password: string };

  try {
    const session = await createSession({
      username,
      password,
      device: device || '',
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
    };
  }
};

export default createSessionHandler;
