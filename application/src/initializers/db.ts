import { createConnection, Connection } from 'typeorm';

import { type, database, host, password, port, username } from '../config/db';
import { isProductionEnv } from '../config/application';
import UserAccount from '../db/entity/UserAccount';

const ssl: boolean = isProductionEnv;

export default async (): Promise<Connection> => {
  const connection = await createConnection({
    type,
    database,
    host,
    password,
    port,
    username,
    entities: [UserAccount],
    extra: {
      ssl,
    },
    logging: true,
  });

  console.log({ msg: 'DB was connected', time: new Date() });

  return connection;
};
