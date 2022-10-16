import { Serializer, Error } from 'jsonapi-serializer';

import { CookieAction, HttpStatusCodes } from 'lib/Adapter/types';
import createUser from 'concepts/user/create';
import { Handler } from '../../lib/Adapter/types';
import createSession from '../../concepts/user/session/create';
import UserAccount from '../../db/entity/UserAccount';

const createUserHandler: Handler = async ({
  body,
  payload: { ip },
  // TODO: Move to constants
  headers: { 'user-agent': device = 'unresolved device' },
}) => {
  const { username, password, email } = body as {
    username: string;
    email: string;
    password: string;
  };
  try {
    await createUser({ username, email, password });
    console.log(device, ip);
    const session = await createSession({ username, password, ip, device });
    const SessionSerializer = new Serializer('session', {
      attributes: ['accessToken', 'refreshToken', 'user', 'sessionId'],
      user: {
        ref: (_: undefined, user: UserAccount) => user.id,
        attributes: ['username', 'email', 'role'],
      },
    });

    return {
      status: HttpStatusCodes.Success,
      body: await SessionSerializer.serialize(session),
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

export default createUserHandler;
