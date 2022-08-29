import { Error, Serializer } from 'jsonapi-serializer';

import deleteSession from 'concepts/user/session/delete';
import UserSession from 'db/entity/UserSession';
import { userMessages } from 'constants/messages';
import sessionsList from '../../../concepts/user/session';
import { Handler, HttpStatusCodes } from '../../../lib/Adapter/types';

interface Params {
  sessionId: string;
}

const deleteSessionHandler: Handler = async function ({ body }) {
  const { sessionId } = body as Params;
  if (
    await UserSession.findOne({
      where: { userId: this.userId, sessionId },
    })
  ) {
    await deleteSession({ sessionId });

    return {
      status: HttpStatusCodes.Success,
    };
  }

  return {
    status: HttpStatusCodes.Forbidden,
    body: new Error({
      title: userMessages.sessionNotFound,
    }),
  };
};

export default deleteSessionHandler;
