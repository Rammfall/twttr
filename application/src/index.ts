import dotenv from 'dotenv';
import 'reflect-metadata';

dotenv.config();

import { APPLICATION_PORT, SERVER_ADDRESS } from './config/application';
import db from './initializers/db';
import Core from './lib/Core';

const coreApplication = new Core({ port: APPLICATION_PORT });

const start = async () => {
  await db();
  await coreApplication.start();
};
start();
