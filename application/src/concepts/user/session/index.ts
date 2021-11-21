import UserSession from 'db/entity/UserSession';

const sessionsList = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<UserSession[]> => {
  return await UserSession.find({ refreshToken });
};

export default sessionsList;
