import { FastifyReply, FastifyRequest } from 'fastify';
import { hash } from 'bcrypt';

import UserAccount, { Roles } from '../../db/entity/UserAccount';

const createUser = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const {
    // @ts-ignore
    body: { username, email, password },
  } = request;

  if ((await UserAccount.find({ username })).length) {
    return reply.status(403).send({ info: 'username already exist' });
  }

  const user = new UserAccount();
  user.username = username;
  user.role = Roles.user;
  user.email = email;
  user.password = await hash(password, 3);

  await user.save();

  return reply.send({ info: 'cool' });
};

export default createUser;
