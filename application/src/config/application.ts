export const isProductionEnv = process.env.NODE_ENV === 'production';
export const APPLICATION_PORT = process.env.PORT as unknown as number;
export const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
export const LOGIN_ACCESS_SECRET = process.env.LOGIN_ACCESS_SECRET as string;
export const COOKIE_SECRET = process.env.COOKIE_SECRET;
