import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { v4 } from 'uuid';
import { add } from 'date-fns';

import UserSession from 'db/entity/UserSession';
import { LOGIN_ACCESS_SECRET } from 'config/application';
import UserAccount from 'db/entity/UserAccount';
import { userMessages } from 'constants/messages';

import { LOGIN_ACCESS_EXPIRES, LOGIN_REFRESH_EXPIRES } from './constants';

const createSession = async ({
  username,
  password,
  device,
  ip,
}: {
  username: string;
  password: string;
  device: string;
  ip: string;
}): Promise<UserSession> => {
  const user = await UserAccount.findOne({ where: { username } });

  if (user) {
    if (!(await compare(password, user.password))) {
      throw new Error(userMessages.incorrectPassword);
    }

    const accessToken = sign(
      { username, email: user.email },
      LOGIN_ACCESS_SECRET,
      {
        expiresIn: LOGIN_ACCESS_EXPIRES,
      },
    );
    const refreshToken = v4();
    const session = new UserSession();

    session.accessToken = accessToken;
    session.refreshToken = refreshToken;
    session.sessionId = v4();
    session.device = device;
    session.user = user;
    session.expiredDate = add(new Date(), {
      days: LOGIN_REFRESH_EXPIRES,
    }).toISOString();
    session.ip = ip;

    await session.save();

    return session;
  }

  throw new Error(userMessages.userNotFound);
};

export default createSession;
