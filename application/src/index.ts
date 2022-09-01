import 'reflect-metadata';

import Core from 'lib/Core';

import { APPLICATION_PORT } from './config/application';
import { AppDataSource } from './initializers/data-source';

const coreApplication = new Core({ port: APPLICATION_PORT });

const start = async () => {
  await AppDataSource.initialize();
  await coreApplication.start();
};

start()
  .then(() => {
    console.log({ msg: 'All system was started', time: new Date() });
  })
  .catch((e) => {
    console.log(e);
  });
