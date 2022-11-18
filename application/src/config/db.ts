import env from 'dotenv';

env.config();

export const DB_TYPE = 'postgres';
export const { DB_NAME } = process.env;
export const DB_PORT = process.env.DB_PORT as unknown as number;
export const { DB_USERNAME } = process.env;
export const { DB_PASSWORD } = process.env;
export const { DB_HOST } = process.env;
export const CACHE_TYPE = 'redis';
export const { CACHE_HOST } = process.env;
export const { CACHE_PORT } = process.env;
