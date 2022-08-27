const processEnv = process.env;

export const isProductionEnv = processEnv['NODE_ENV'] === 'production';
export const APPLICATION_PORT = +processEnv['PORT'];
export const SERVER_ADDRESS = processEnv['SERVER_ADDRESS'];
export const LOGIN_ACCESS_SECRET = processEnv['LOGIN_ACCESS_SECRET'];
export const COOKIE_SECRET = processEnv['COOKIE_SECRET'];
