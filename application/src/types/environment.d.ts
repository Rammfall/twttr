declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      NODE_ENV: 'development' | 'production';
      DB_NAME: number;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_HOST: string;
      SENTRY_DSN: string;
      CASH_URL: string;
      CASH_PORT: string;
    }
  }
}

export {};
