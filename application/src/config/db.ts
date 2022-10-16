import env from 'dotenv';

env.config();

export const DB_TYPE = 'postgres';
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT as unknown as number;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_HOST = process.env.DB_HOST;
export const CACHE_TYPE = 'redis';
export const CACHE_HOST = process.env.CACHE_HOST;
export const CACHE_PORT = process.env.CACHE_PORT;
