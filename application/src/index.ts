import dotenv from 'dotenv';
import 'reflect-metadata';

import Core from 'lib/Core';

dotenv.config();

import { APPLICATION_PORT, SERVER_ADDRESS } from './config/application';
import db from './initializers/db';

const coreApplication = new Core({ port: APPLICATION_PORT });

const start = async () => {
  await db();
  await coreApplication.start();
};

start()
  .then(() => {
    console.log({ msg: 'All system was started', time: new Date() });
  })
  .catch((e) => {
    console.log(e);
  });
