import { verify } from 'jsonwebtoken';
import { Error } from 'jsonapi-serializer';

import {
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import UserSession from 'db/entity/UserSession';
import { LOGIN_ACCESS_SECRET } from 'config/application';
import { userMessages } from '../constants/messages';

interface Params {
  refreshToken: string;
  accessToken: string;
}

const authCheck = async ({
  cookies: { refreshToken, accessToken },
}: HandlerArguments<Params>): Promise<
  | {
      result: true;
      payload: unknown;
    }
  | {
      result: false;
      reply: HttpResult;
    }
> => {
  const session = await UserSession.findOne({ where: { refreshToken } });

  if (session) {
    try {
      await verify(accessToken, LOGIN_ACCESS_SECRET);

      return {
        result: true,
        payload: {
          session,
        },
      };
    } catch (error) {
      return {
        result: false,
        reply: {
          status: httpStatusCodes.Unauthorized,
          body: new Error({
            title: userMessages.unauthorized,
          }),
        },
      };
    }
  }

  return {
    result: false,
    reply: {
      status: httpStatusCodes.NotFound,
      body: new Error({
        title: userMessages.sessionNotFound,
      }),
    },
  };
};

export default authCheck;
