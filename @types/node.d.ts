declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV: string | undefined;
    APP_NAME: string;
    APP_VERSION: string;
    APP_PROTOCOL: string;
    APP_HOST: string;
    APP_PORT: string;
    APP_PATH: string;
  }
}
