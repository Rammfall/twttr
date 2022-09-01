import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as Entities from '../db/entity';
import { UserAccount1620336005117 } from '../db/migration/1620336005117-UserAccount';
import { UserSession1629023006862 } from '../db/migration/1629023006862-UserSession';
import {
  CACHE_HOST,
  CACHE_PORT,
  CACHE_TYPE,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USERNAME,
} from '../config/db';

export const AppDataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: true,
  entities: [...Object.values(Entities)],
  migrations: [UserAccount1620336005117, UserSession1629023006862],
  subscribers: [],
  cache: {
    type: CACHE_TYPE,
    options: {
      host: CACHE_HOST,
      port: CACHE_PORT,
    },
  },
});
