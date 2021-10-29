import { v4 } from 'uuid';
import { sign } from 'jsonwebtoken';

import UserSession from 'db/entity/UserSession';
import { userMessages } from 'constants/messages';
import { LOGIN_ACCESS_SECRET } from 'config/application';
import { LOGIN_ACCESS_EXPIRES } from './constants';
import { isSessionExpired } from './shared/isSessionExpired';

const refreshSession = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<UserSession> => {
  const session = await UserSession.findOne(
    { refreshToken },
    { relations: ['user'] }
  );

  if (session) {
    const expiredDate = new Date(session.expiredDate);

    if (isSessionExpired(expiredDate)) {
      const { username, email } = session.user;

      session.refreshToken = v4();
      session.accessToken = sign(
        { username, email: email },
        LOGIN_ACCESS_SECRET,
        {
          expiresIn: LOGIN_ACCESS_EXPIRES,
        }
      );

      return await session.save();
    }

    await session.remove();
    throw new Error(userMessages.refreshExpired);
  }

  throw new Error(userMessages.sessionNotFound);
};

export default refreshSession;
