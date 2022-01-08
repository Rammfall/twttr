import UserSession from 'db/entity/UserSession';

const sessionsList = async ({
  userId,
}: {
  userId: number;
}): Promise<UserSession[]> => {
  return await UserSession.find({ userId: userId });
};

export default sessionsList;
