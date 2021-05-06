// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const processEnv: { [key: string]: string } = process.env;

export const type = 'postgres';
export const database = processEnv['DB_NAME'];
export const port = +processEnv['DB_PORT'];
export const username = processEnv['DB_USERNAME'];
export const password = processEnv['DB_PASSWORD'];
export const host = processEnv['DB_HOST'];
