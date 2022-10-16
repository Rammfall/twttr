export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPLICATION_PORT: number;
      NODE_ENV: 'development' | 'production';
      DB_NAME: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      SENTRY_DSN: string;
      CASH_URL: string;
      CASH_PORT: string;
      LOGIN_ACCESS_SECRET: string;
    }
  }
}

declare module 'fastify' {
  import { IncomingMessage, Server, ServerResponse } from 'http';
  import { FastifySchema as FS } from 'fastify/types/schema';

  export interface FastifySchema extends FS {
    cookies?: unknown;
  }

  export interface FastifyInstance<
    HttpServer = Server,
    HttpRequest = IncomingMessage,
    HttpResponse = ServerResponse
  > {
    userId: number;
  }
}
