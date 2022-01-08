import UserSession from 'db/entity/UserSession';

async function deleteSession({
  sessionId,
}: {
  sessionId: string;
}): Promise<void> {
  const session = await UserSession.findOne({ sessionId });

  if (session) {
    await session.remove();
  }
}

export default deleteSession;
