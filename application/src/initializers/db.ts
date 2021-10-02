import { createConnection, Connection } from 'typeorm';

import { type, database, host, password, port, username } from '../config/db';
import { isProductionEnv } from '../config/application';
import UserAccount from '../db/entity/UserAccount';
import UserSession from '../db/entity/UserSession';

const ssl: boolean = isProductionEnv;

export default async (): Promise<Connection> => {
  const connection = await createConnection({
    type,
    database,
    host,
    password,
    port,
    username,
    entities: [UserAccount, UserSession],
    extra: {
      ssl,
    },
    logging: true,
  });

  console.log({ msg: 'DB was connected', time: new Date() });

  return connection;
};
