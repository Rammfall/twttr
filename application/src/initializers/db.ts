import { createConnection, Connection } from 'typeorm';

import { type, database, host, password, port, username } from '../config/db';
import { isProductionEnv } from '../config/application';

const ssl: boolean = isProductionEnv;

export default async (): Promise<Connection> => {
  return await createConnection({
    type,
    database,
    host,
    password,
    port,
    username,
    entities: ['src/db/entity/*.ts'],
    extra: {
      ssl,
    },
    logging: true,
  });
};
