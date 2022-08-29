import cluster from 'cluster';
import os from 'os';

import getAllRoutes from 'lib/Router/getAllRoutes';
import preparedRouting, { PreparedRoute } from 'lib/Router/prepareRoutes';
import Adapter from '../Adapter';

interface CoreConfig {
  port?: number;
  multiTread?: boolean;
}

class Core {
  private readonly port: number;
  private readonly directory = 'src/routes';
  private readonly routes: string[];
  private readonly preparedRoutes: PreparedRoute[];
  private readonly multiTread: boolean;
  private readonly server: Adapter;

  constructor({ port, multiTread }: CoreConfig) {
    this.port = port || 3000;
    this.multiTread = multiTread || false;
    this.routes = getAllRoutes(this.directory);
    this.preparedRoutes = preparedRouting(this.routes);
    this.server = new Adapter({ routes: this.preparedRoutes });
  }

  private prepare = async (): Promise<void> => {
    await this.server.start(this.port);
  };

  start = async (): Promise<void> => {
    if (this.multiTread) {
      if (cluster.isPrimary) {
        const cpusCount = os.cpus();

        cpusCount.forEach(() => {
          cluster.fork();
        });
      } else {
        await this.prepare();
      }
    } else {
      await this.prepare();
    }
  };
}

export default Core;
