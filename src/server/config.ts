// Extract process.env, use process.env or webpack define-plugin's settings
const {
  NODE_ENV = process.env.NODE_ENV === 'development',
  APP_DIST = process.env.APP_DIST!,
  APP_NAME = process.env.APP_NAME!,
  APP_VERSION = process.env.APP_VERSION!,
  APP_PROTOCOL = process.env.APP_PROTOCOL!,
  APP_HOST = process.env.APP_HOST!,
  APP_PORT = process.env.APP_PORT!,
  APP_PATH = process.env.APP_PATH!,
} = process.env;

const config = {
  isDev: NODE_ENV,
  dist: APP_DIST,
  name: APP_NAME,
  version: APP_VERSION,
  connection: {
    protocol: APP_PROTOCOL,
    host: APP_HOST,
    port: APP_PORT,
    path: APP_PATH
  },
};

export default config;
