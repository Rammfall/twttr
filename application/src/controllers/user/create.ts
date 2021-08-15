import {
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import createUser from 'concepts/user/create';

interface Params {
  username: string;
  email: string;
  password: string;
}

const createUserHandler = async ({
  body: { username, email, password },
}: HandlerArguments<Params>): Promise<HttpResult> => {
  try {
    const user = await createUser({ username, email, password });

    return {
      status: httpStatusCodes.Success,
      body: {
        username: user.username,
        password: user.password,
        email: user.email,
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

export default createUserHandler;
