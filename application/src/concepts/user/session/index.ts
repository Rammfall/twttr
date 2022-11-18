import UserSession from 'db/entity/UserSession';

const sessionsList = async ({
  userId,
}: {
  userId: number;
}): Promise<UserSession[]> => await UserSession.find({ where: { userId } });

export default sessionsList;
