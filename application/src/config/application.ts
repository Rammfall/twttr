export const isProductionEnv = process.env.NODE_ENV === 'production';
export const APPLICATION_PORT = process.env
  .APPLICATION_PORT as unknown as number;
export const { SERVER_ADDRESS } = process.env;
export const { LOGIN_ACCESS_SECRET } = process.env;
export const { COOKIE_SECRET } = process.env;
