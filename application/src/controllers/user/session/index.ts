import { Serializer, Error } from 'jsonapi-serializer';

import {
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import sessionsList from 'concepts/user/session';
import { userMessages } from 'constants/messages';

const sessionListHandler = async ({
  actionsPayload: { refreshToken },
}: HandlerArguments<never>): Promise<HttpResult> => {
  console.log(refreshToken);
  if (refreshToken && typeof refreshToken === 'string') {
    const sessions = await sessionsList({ refreshToken });
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

export default sessionListHandler;
