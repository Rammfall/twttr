import { Error, Serializer } from 'jsonapi-serializer';

import {
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import deleteSession from 'concepts/user/session/delete';
import UserSession from 'db/entity/UserSession';
import { userMessages } from 'constants/messages';
import sessionsList from '../../../concepts/user/session';

interface Params {
  sessionId: string;
}

const deleteSessionHandler = async ({
  actionsPayload: { session },
  body: { sessionId },
}: HandlerArguments<Params>): Promise<HttpResult> => {
  console.log(session);
  if (
    session instanceof UserSession &&
    (await UserSession.findOne({ userId: session.userId, sessionId }))
  ) {
    await deleteSession({ sessionId });
    const sessions = await sessionsList({ userId: session.userId });
    const SessionSerializer = new Serializer('session', {
      attributes: ['sessionId', 'device', 'ip'],
    });

    return {
      status: httpStatusCodes.Success,
      body: SessionSerializer.serialize(sessions),
    };
  }

  return {
    status: httpStatusCodes.Forbidden,
    body: new Error({
      title: userMessages.sessionNotFound,
    }),
  };
};

export default deleteSessionHandler;
