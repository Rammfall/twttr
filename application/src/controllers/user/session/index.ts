import { Serializer } from 'jsonapi-serializer';

import sessionsList from 'concepts/user/session';
import { Handler, HttpStatusCodes } from '../../../lib/Adapter/types';

const sessionListHandler: Handler = async function () {
  const sessions = await sessionsList({ userId: this.userId });
  const SessionSerializer = new Serializer('session', {
    attributes: ['sessionId', 'device', 'ip', 'updatedAt'],
  });

  return {
    status: HttpStatusCodes.Success,
    body: SessionSerializer.serialize(sessions),
  };
};

export default sessionListHandler;
