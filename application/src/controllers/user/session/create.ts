import {
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import createSession from 'concepts/user/session/create';

interface Params {
  username: string;
  email: string;
  password: string;
}

const createSessionHandler = async ({
  body: { username, password },
  headers: { 'user-agent': device },
  payload: { ip },
}: HandlerArguments<Params>): Promise<HttpResult> => {
  try {
    const session = await createSession({
      username,
      password,
      device,
      ip,
    });

    return {
      status: httpStatusCodes.Success,
      body: {
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
      },
    };
  } catch (e) {
    return {
      status: httpStatusCodes.Forbidden,
      body: {
        info: e.message,
      },
    };
  }
};

export default createSessionHandler;
