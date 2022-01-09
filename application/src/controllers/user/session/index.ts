import { Serializer, Error } from 'jsonapi-serializer';

import {
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import sessionsList from 'concepts/user/session';
import { userMessages } from 'constants/messages';
import UserSession from 'db/entity/UserSession';

const sessionListHandler = async ({
  actionsPayload: { session },
}: HandlerArguments<never>): Promise<HttpResult> => {
  if (session && session instanceof UserSession) {
    const sessions = await sessionsList({ userId: session.userId });
    const SessionSerializer = new Serializer('session', {
      attributes: ['sessionId', 'device', 'ip', 'updatedAt'],
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

export default sessionListHandler;
