import { Serializer, Error } from 'jsonapi-serializer';

import { HttpStatusCodes } from 'lib/Adapter/types';
import createUser from 'concepts/user/create';
import { Handler } from '../../lib/Adapter/types';

const createUserHandler: Handler = async ({ body }) => {
  const { username, password, email } = body as {
    username: string;
    email: string;
    password: string;
  };
  try {
    const user = await createUser({ username, email, password });

    const UserSerializer = new Serializer('user', {
      attributes: ['email', 'username', 'role'],
    });

    return {
      status: HttpStatusCodes.Success,
      body: UserSerializer.serialize(user),
    };
  } catch ({ message }) {
    return {
      status: HttpStatusCodes.Forbidden,
      body: new Error({
        title: typeof message === 'string' ? message : undefined,
      }),
    };
  }
};

export default createUserHandler;
