import { hash } from 'bcrypt';

import {
  HandlerArguments,
  HttpResult,
  httpStatusCodes,
} from 'types/RouteParams';
import UserAccount, { Roles } from 'db/entity/UserAccount';

interface Params extends HandlerArguments {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

const createUser = async ({
  body: { username, email, password },
}: Params): Promise<HttpResult> => {
  if ((await UserAccount.find({ username })).length) {
    return {
      status: httpStatusCodes.Forbidden,
      body: {
        info: 'username already exist',
      },
    };
  }

  if ((await UserAccount.find({ email })).length) {
    return {
      status: httpStatusCodes.Forbidden,
      body: {
        info: 'email already exist',
      },
    };
  }

  const user = new UserAccount();
  user.username = username;
  user.role = Roles.user;
  user.email = email;
  user.password = await hash(password, 3);

  await user.save();

  return {
    status: httpStatusCodes.Success,
    body: {
      info: 'User was created',
    },
  };
};

export default createUser;
