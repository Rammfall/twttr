import UserSession from 'db/entity/UserSession';
import { userMessages } from '../../../constants/messages';
import { isSessionExpired } from './shared/isSessionExpired';

const endSession = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<boolean> => {
  const session = await UserSession.findOne({ where: { refreshToken } });

  if (session) {
    if (isSessionExpired(new Date(session.expiredDate))) {
      await session.remove();

      return true;
    }

    throw new Error(userMessages.refreshExpired);
  }

  throw new Error(userMessages.sessionNotFound);
};

export default endSession;
