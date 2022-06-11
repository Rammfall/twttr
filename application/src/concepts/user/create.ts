import { hash } from 'bcrypt';

import UserAccount, { Roles } from 'db/entity/UserAccount';
import { userMessages } from 'constants/messages';

const createUser = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<UserAccount> => {
  if ((await UserAccount.find({ where: { username } })).length) {
    throw new Error(userMessages.existUsername);
  }

  if ((await UserAccount.find({ where: { email } })).length) {
    throw new Error(userMessages.existEmail);
  }

  const user = new UserAccount();

  user.username = username;
  user.email = email;
  user.role = Roles.user;
  user.password = await hash(password, 10);
  await user.save();

  return user;
};

export default createUser;
