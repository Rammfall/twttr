import { Serializer, Error } from 'jsonapi-serializer';

import {
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import createUser from 'concepts/user/create';
import { Handler } from '../../lib/Adapter/types';

interface Params {
  username: string;
  email: string;
  password: string;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const createUserHandler: Handler = async ({
  body: { username, email, password },
}: HandlerArguments<Params>): Promise<HttpResult> => {
  try {
    const user = await createUser({ username, email, password });

    const UserSerializer = new Serializer('user', {
      attributes: ['email', 'username', 'role'],
    });

    return {
      status: httpStatusCodes.Success,
      body: UserSerializer.serialize(user),
    };
  } catch ({ message }) {
    return {
      status: httpStatusCodes.Forbidden,
      body: new Error({
        title: typeof message === 'string' ? message : undefined,
      }),
    };
  }
};

export default createUserHandler;
