// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const processEnv: { [key: string]: string } = process.env;

export const isProductionEnv = processEnv['NODE_ENV'] === 'production';
export const APPLICATION_PORT = +processEnv['PORT'];
export const SERVER_ADDRESS = processEnv['SERVER_ADDRESS'];
