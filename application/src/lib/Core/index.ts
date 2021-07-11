import FastifyAdapter from '../FastifyAdapter';
import getAllRoutes from '../Router/getAllRoutes';
import preparedRouting, { PreparedRoute } from '../Router/prepareRoutes';

interface CoreConfig {
  port?: number;
}

class Core {
  private readonly port: number;
  private readonly directory = 'src/routes';
  private readonly routes: string[];
  private readonly preparedRoutes: PreparedRoute[];

  constructor({ port }: CoreConfig) {
    this.port = port || 3000;
    this.routes = getAllRoutes(this.directory);
    this.preparedRoutes = preparedRouting(this.routes);
  }

  start = async (): Promise<void> => {
    const server = new FastifyAdapter({ routes: this.preparedRoutes });

    await server.start(this.port);
  };
}

export default Core;
